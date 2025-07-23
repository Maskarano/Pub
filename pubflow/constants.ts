
import { Role } from './types';
import type { User, MenuItem, Order, SalesReport } from './types';
import { OrderStatus, PaymentMethod } from './types';

export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CONFIRMATION: '/confirmation/:orderId',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DASHBOARD_CASHIER: '/dashboard/orders',
  DASHBOARD_ADMIN_MENU: '/dashboard/menu',
  DASHBOARD_ADMIN_USERS: '/dashboard/users',
  DASHBOARD_SUPER_ADMIN_ANALYTICS: '/dashboard/analytics',
  DASHBOARD_SUPER_ADMIN_MANAGEMENT: '/dashboard/management',
};

export const MOCK_MENU_ITEMS: MenuItem[] = [
    { id: '1', name: 'Craft Lager', description: 'A crisp and refreshing lager with a hint of citrus.', price: 6.50, category: 'Drinks', imageUrl: 'https://picsum.photos/id/102/400/300' },
    { id: '2', name: 'Classic IPA', description: 'A bold India Pale Ale with strong hop flavors.', price: 7.00, category: 'Drinks', imageUrl: 'https://picsum.photos/id/111/400/300' },
    { id: '3', name: 'Guinness Stout', description: 'Rich and creamy dark stout with notes of coffee.', price: 8.00, category: 'Drinks', imageUrl: 'https://picsum.photos/id/145/400/300' },
    { id: '4', name: 'Pub Burger', description: 'Juicy beef patty with cheddar, lettuce, and special sauce.', price: 15.00, category: 'Food', imageUrl: 'https://picsum.photos/id/212/400/300' },
    { id: '5', name: 'Fish & Chips', description: 'Beer-battered cod served with thick-cut fries.', price: 18.00, category: 'Food', imageUrl: 'https://picsum.photos/id/312/400/300' },
    { id: '6', name: 'Spicy Wings', description: 'A dozen crispy chicken wings tossed in our signature hot sauce.', price: 12.50, category: 'Food', imageUrl: 'https://picsum.photos/id/431/400/300' },
    { id: '7', name: 'Caesar Salad', description: 'Fresh romaine with croutons, parmesan, and Caesar dressing.', price: 10.00, category: 'Food', imageUrl: 'https://picsum.photos/id/365/400/300' },
    { id: '8', name: 'Pretzel Bites', description: 'Warm, soft pretzel bites served with cheese dip.', price: 9.00, category: 'Snacks', imageUrl: 'https://picsum.photos/id/404/400/300' },
];

export const MOCK_USERS: User[] = [
    { id: 'user-cashier-1', username: 'cashier1', role: Role.CASHIER, name: 'John Doe' },
    { id: 'user-admin-1', username: 'admin1', role: Role.ADMIN, name: 'Jane Smith' },
    { id: 'user-super-1', username: 'superadmin', role: Role.SUPER_ADMIN, name: 'Alice Johnson' },
];

export const MOCK_INITIAL_ORDERS: Order[] = [
  { 
    id: 'ord-101', 
    tableNumber: 5, 
    items: [{ ...MOCK_MENU_ITEMS[3], quantity: 1 }, { ...MOCK_MENU_ITEMS[1], quantity: 2 }],
    total: 28.00,
    status: OrderStatus.PLACED,
    paymentMethod: PaymentMethod.MOBILE_MONEY,
    paymentConfirmed: false,
    timestamp: new Date(Date.now() - 5 * 60000)
  },
  { 
    id: 'ord-102', 
    tableNumber: 12, 
    items: [{ ...MOCK_MENU_ITEMS[4], quantity: 2 }],
    total: 30.00,
    status: OrderStatus.PREPARING,
    paymentMethod: PaymentMethod.CASH,
    paymentConfirmed: false,
    timestamp: new Date(Date.now() - 2 * 60000)
  }
];

export const MOCK_SALES_REPORT: SalesReport = {
    daily: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0],
        total: Math.floor(Math.random() * 2000) + 500,
        orders: Math.floor(Math.random() * 50) + 10,
    })),
    monthly: [
        { month: 'January', total: 45000, orders: 1200 },
        { month: 'February', total: 48000, orders: 1300 },
        { month: 'March', total: 52000, orders: 1450 },
        { month: 'April', total: 55000, orders: 1500 },
    ],
    paymentSummary: [
        { method: PaymentMethod.MOBILE_MONEY, total: 120000 },
        { method: PaymentMethod.CASH, total: 80000 },
    ],
};
