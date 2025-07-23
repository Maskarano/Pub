
import React, { useState, useEffect } from 'react';
import { MOCK_INITIAL_ORDERS } from '../../../constants';
import type { Order } from '../../../types';
import { OrderStatus, PaymentMethod } from '../../../types';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const getStatusColor = (status: OrderStatus) => {
    switch(status) {
        case OrderStatus.PLACED: return 'bg-blue-500';
        case OrderStatus.PREPARING: return 'bg-yellow-500';
        case OrderStatus.READY: return 'bg-green-500';
        case OrderStatus.COMPLETED: return 'bg-gray-600';
        case OrderStatus.CANCELLED: return 'bg-red-600';
        default: return 'bg-gray-500';
    }
};

const OrderCard: React.FC<{ order: Order; onUpdateStatus: (id: string, status: OrderStatus) => void; onConfirmPayment: (id: string) => void }> = ({ order, onUpdateStatus, onConfirmPayment }) => {
    const nextStatus = {
        [OrderStatus.PLACED]: OrderStatus.PREPARING,
        [OrderStatus.PREPARING]: OrderStatus.READY,
        [OrderStatus.READY]: OrderStatus.COMPLETED,
    }[order.status];

    return (
        <Card className="p-4 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">Order #{order.id.split('-')[1]}</h3>
                    <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                </div>
                <p className="text-sm text-gray-400">Table: {order.tableNumber}</p>
                <p className="text-sm text-gray-400">Total: <span className="font-semibold text-amber-400">${order.total.toFixed(2)}</span></p>

                <ul className="my-3 space-y-1 text-sm text-gray-300 border-t border-b border-gray-700 py-2">
                    {order.items.map(item => (
                        <li key={item.id}>{item.quantity} x {item.name}</li>
                    ))}
                </ul>

                <div className={`p-2 rounded-md text-center text-sm font-semibold ${order.paymentConfirmed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {order.paymentMethod} - {order.paymentConfirmed ? 'Paid' : 'Pending'}
                </div>
            </div>
            
            <div className="mt-4 flex flex-col space-y-2">
                {!order.paymentConfirmed && (
                    <Button size="sm" variant="secondary" onClick={() => onConfirmPayment(order.id)}>Confirm Payment</Button>
                )}
                {nextStatus && order.paymentConfirmed && (
                    <Button size="sm" onClick={() => onUpdateStatus(order.id, nextStatus)}>
                        Mark as {nextStatus}
                    </Button>
                )}
                 {order.status === OrderStatus.READY && !order.paymentConfirmed && (
                    <p className="text-xs text-center text-red-400">Confirm payment before marking as completed.</p>
                )}
            </div>
        </Card>
    );
};

const CashierDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_INITIAL_ORDERS);

  useEffect(() => {
    // Simulate receiving a new order every 15 seconds
    const interval = setInterval(() => {
      setOrders(prevOrders => [
          ...prevOrders, 
          {
            id: `ord-${Date.now()}`,
            tableNumber: Math.floor(Math.random() * 20) + 1,
            items: [{...MOCK_INITIAL_ORDERS[0].items[0], quantity: 1}],
            total: 15.00,
            status: OrderStatus.PLACED,
            paymentMethod: Math.random() > 0.5 ? PaymentMethod.CASH : PaymentMethod.MOBILE_MONEY,
            paymentConfirmed: false,
            timestamp: new Date()
          }
      ]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);


  const handleUpdateStatus = (id: string, status: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? {...o, status} : o));
  };

  const handleConfirmPayment = (id: string) => {
    setOrders(orders.map(o => o.id === id ? {...o, paymentConfirmed: true} : o));
  }

  const activeOrders = orders.filter(o => o.status !== OrderStatus.COMPLETED && o.status !== OrderStatus.CANCELLED)
                             .sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime());

  return (
    <DashboardLayout title="Live Orders">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeOrders.length > 0 ? (
            activeOrders.map(order => (
                <OrderCard key={order.id} order={order} onUpdateStatus={handleUpdateStatus} onConfirmPayment={handleConfirmPayment}/>
            ))
        ) : (
            <div className="col-span-full text-center py-16">
                <p className="text-gray-400 text-lg">No active orders right now.</p>
            </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CashierDashboard;
