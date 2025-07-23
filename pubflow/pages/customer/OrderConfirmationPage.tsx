
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Order } from '../../types';
import { OrderStatus } from '../../types';
import CustomerHeader from '../../components/customer/CustomerHeader';

const statusFlow = [
  OrderStatus.PLACED,
  OrderStatus.PREPARING,
  OrderStatus.READY,
  OrderStatus.COMPLETED,
];

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(OrderStatus.PLACED);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('pubflow_lastOrder');
    if (savedOrder) {
      const parsedOrder: Order = JSON.parse(savedOrder);
      if (parsedOrder.id === orderId) {
        setOrder(parsedOrder);
        setCurrentStatus(parsedOrder.status);
      }
    }
  }, [orderId]);

  useEffect(() => {
    if (!order) return;

    // Simulate real-time status updates from the kitchen/bar
    const interval = setInterval(() => {
      setCurrentStatus(prevStatus => {
        const currentIndex = statusFlow.indexOf(prevStatus);
        if (currentIndex < statusFlow.length - 1) {
          return statusFlow[currentIndex + 1];
        }
        clearInterval(interval);
        return prevStatus;
      });
    }, 8000); // Update every 8 seconds for demonstration

    return () => clearInterval(interval);
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading order details...</p>
      </div>
    );
  }

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
        case OrderStatus.PLACED: return 'text-blue-400';
        case OrderStatus.PREPARING: return 'text-yellow-400';
        case OrderStatus.READY: return 'text-green-400';
        case OrderStatus.COMPLETED: return 'text-gray-500';
        default: return 'text-white';
    }
  }

  const currentStatusIndex = statusFlow.indexOf(currentStatus);

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomerHeader />
      <main className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-amber-400 mb-2">Thank You!</h1>
          <p className="text-lg text-gray-300 mb-6">Your order has been placed successfully.</p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Live Order Status</h2>
            <div className="w-full">
                <div className="flex justify-between items-center text-xs text-gray-400">
                    {statusFlow.slice(0, -1).map(s => <span key={s}>{s}</span>)}
                </div>
                <div className="relative w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div
                        className="bg-amber-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(currentStatusIndex / (statusFlow.length - 2)) * 100}%` }}
                    />
                </div>
                <p className={`mt-3 text-lg font-bold ${getStatusColor(currentStatus)}`}>{currentStatus}</p>
            </div>
          </div>

          <div className="text-left border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Order Summary (ID: {order.id})</h3>
            <p className="text-gray-400">Table Number: {order.tableNumber}</p>
            <ul className="my-4 space-y-2">
              {order.items.map(item => (
                <li key={item.id} className="flex justify-between text-gray-300">
                  <span>{item.quantity} x {item.name}</span>
                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-600 pt-2 flex justify-between font-bold text-white text-xl">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <p className="text-gray-400 mt-1">Payment via {order.paymentMethod}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmationPage;
