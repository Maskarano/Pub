
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_SALES_REPORT } from '../../../constants';
import type { SalesReport } from '../../../types';
import { PaymentMethod } from '../../../types';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../../../components/ui/Card';

const SuperAdminAnalytics: React.FC = () => {
  const [report] = useState<SalesReport>(MOCK_SALES_REPORT);

  const COLORS = {
      [PaymentMethod.MOBILE_MONEY]: '#3B82F6', // blue-500
      [PaymentMethod.CASH]: '#F59E0B', // amber-500
  };
  
  const paymentData = report.paymentSummary.map(p => ({name: p.method, value: p.total}));

  return (
    <DashboardLayout title="Sales Analytics">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <h3 className="text-gray-400 text-sm">Total Revenue (Month)</h3>
          <p className="text-3xl font-bold text-white">${report.monthly.reduce((sum, m) => sum + m.total, 0).toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-gray-400 text-sm">Total Orders (Month)</h3>
          <p className="text-3xl font-bold text-white">{report.monthly.reduce((sum, m) => sum + m.orders, 0).toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-gray-400 text-sm">Avg. Order Value</h3>
          <p className="text-3xl font-bold text-white">${(report.monthly.reduce((sum, m) => sum + m.total, 0) / report.monthly.reduce((sum, m) => sum + m.orders, 0)).toFixed(2)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="p-6 lg:col-span-3">
          <h3 className="text-lg font-semibold text-white mb-4">Daily Sales (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={report.daily} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="date" tick={{ fill: '#A0AEC0' }} fontSize={12} />
              <YAxis tick={{ fill: '#A0AEC0' }} fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#2D3748', border: 'none', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#E2E8F0' }}
              />
              <Legend wrapperStyle={{ color: '#E2E8F0' }}/>
              <Bar dataKey="total" fill="#F59E0B" name="Sales ($)" />
              <Bar dataKey="orders" fill="#3B82F6" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={paymentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {paymentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as PaymentMethod]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none', borderRadius: '0.5rem' }}/>
                    <Legend wrapperStyle={{ color: '#E2E8F0', paddingTop: '10px' }}/>
                </PieChart>
            </ResponsiveContainer>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminAnalytics;
