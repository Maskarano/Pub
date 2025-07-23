
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { PaymentMethod, OrderStatus } from '../../types';
import type { Order } from '../../types';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CustomerHeader from '../../components/customer/CustomerHeader';

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.MOBILE_MONEY);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableNumber || parseInt(tableNumber) <= 0) {
      setError('Please enter a valid table number.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate API call to submit order
    setTimeout(() => {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        tableNumber: parseInt(tableNumber),
        items: cartItems,
        total: cartTotal,
        status: OrderStatus.PLACED,
        paymentMethod,
        paymentConfirmed: false,
        timestamp: new Date(),
      };

      // In a real app, you'd send this to the backend.
      // We'll store it in sessionStorage for the confirmation page.
      sessionStorage.setItem('pubflow_lastOrder', JSON.stringify(newOrder));
      
      clearCart();
      setIsSubmitting(false);
      navigate(`/confirmation/${newOrder.id}`);
    }, 1000);
  };

  if (cartItems.length === 0 && !isSubmitting) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomerHeader />
      <main className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-6">Checkout</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Input
                label="Your Table Number"
                id="tableNumber"
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g., 12"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  {(Object.values(PaymentMethod)).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 rounded-lg text-left border-2 transition-colors ${
                        paymentMethod === method ? 'border-amber-500 bg-amber-500/10' : 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <span className="font-semibold text-white">{method}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                 <div className="flex justify-between text-2xl font-bold text-white">
                    <span>Total to Pay</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
