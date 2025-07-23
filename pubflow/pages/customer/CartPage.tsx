
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/ui/Button';
import CustomerHeader from '../../components/customer/CustomerHeader';
import { ROUTES } from '../../constants';

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, updateItemQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomerHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center bg-gray-800 p-8 rounded-lg">
            <p className="text-xl text-gray-300 mb-4">Your cart is empty.</p>
            <Button onClick={() => navigate(ROUTES.HOME)}>Browse Menu</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
              <ul className="divide-y divide-gray-700">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="text-amber-400">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10))}
                        className="w-16 text-center bg-gray-700 border-gray-600 rounded-md mx-4"
                      />
                       <p className="text-lg font-semibold text-white w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-400">&times;</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-fit">
              <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
              <div className="flex justify-between text-lg text-gray-300 mb-2">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-300 mb-4">
                <span>Taxes & Fees</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-700 pt-4 flex justify-between text-2xl font-bold text-white mb-6">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link to={ROUTES.CHECKOUT} className="w-full">
                <Button size="lg" className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
