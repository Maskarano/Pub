
export enum Role {
  CUSTOMER = 'Customer',
  CASHIER = 'Cashier',
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Admin',
}

export interface User {
  id: string;
  username: string;
  role: Role;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export enum PaymentMethod {
  CASH = 'Cash',
  MOBILE_MONEY = 'Mobile Money',
}

export enum OrderStatus {
  PLACED = 'Placed',
  PREPARING = 'Preparing',
  READY = 'Ready for Pickup',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface Order {
  id: string;
  tableNumber: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentConfirmed: boolean;
  timestamp: Date;
}

export interface SalesReport {
    daily: { date: string; total: number; orders: number }[];
    monthly: { month: string; total: number; orders: number }[];
    paymentSummary: { method: PaymentMethod; total: number }[];
}
