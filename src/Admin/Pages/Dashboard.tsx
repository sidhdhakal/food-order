import  { useState } from 'react';
import { Icon } from '@iconify/react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const chartData = [
  { name: 'Sunday', orders: 320 },
  { name: 'Monday', orders: 380 },
  { name: 'Tuesday', orders: 456 },
  { name: 'Wednesday', orders: 390 },
  { name: 'Thursday', orders: 340 },
  { name: 'Friday', orders: 410 },
  { name: 'Saturday', orders: 450 }
];

const categorySales = [
  { name: 'Fast Food', value: 25, color: '#FF6B6B' },
  { name: 'Snacks', value: 22, color: '#845EF7' },
  { name: 'Beverages', value: 26, color: '#51CF66' },
  { name: 'Desserts', value: 5, color: '#354AF0' },
  { name: 'Main Course', value: 4, color: '#ff9AF0' },
  { name: 'Healthy Options', value: 1, color: '#332354' }
];

const Dashboard = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleSelect = (ranges:any) => {
    setDateRange(ranges.selection);
    console.log('Date Range Selected:', {
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate
    });
  };

  const stats = [
    {
      icon: 'mdi:cart',
      title: 'Total Orders',
      value: '75',
      change: '+4%',
      period: '(30 days)',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: 'mdi:package-variant',
      title: 'Total Delivered',
      value: '357',
      change: '+6%',
      period: '(30 days)',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      icon: 'mdi:close-circle',
      title: 'Total Canceled',
      value: '65',
      change: '-25%',
      period: '(30 days)',
      color: 'text-red-500',
      bgColor: 'bg-red-100'
    },
    {
      icon: 'rivet-icons:money',
      title: 'Total Revenue',
      value: 'Rs 12800',
      change: '+12%',
      period: '(30 days)',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    }
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Icon icon="mdi:calendar" className="text-gray-500" />
            <span className="text-sm text-gray-600">
              {format(dateRange.startDate, 'MMM dd, yyyy')} - {format(dateRange.endDate, 'MMM dd, yyyy')}
            </span>
          </button>
          
          {showDatePicker && (
            <div className="absolute right-0 mt-2 z-50">
              <div className="bg-white rounded-lg shadow-lg p-2">
                <DateRange
                  ranges={[dateRange]}
                  onChange={handleSelect}
                  months={1}
                  direction="vertical"
                  className="border rounded"
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon icon={stat.icon} className={`text-2xl ${stat.color}`} />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-lg  ${stat.color}`}>
                  <h3 className="text-xl font-semibold text-gray-900">{stat.value}</h3>
                  </span>
                </div>
                <p className="text-gray-500 text-md">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Details with Donut Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">Sales Details</h2>
              {/* <p className="text-sm text-gray-500">February, 2023</p> */}
            </div>
            {/* <select className="bg-gray-100 text-sm px-3 py-1 rounded-lg border-none">
              <option>Monthly</option>
              <option>Weekly</option>
            </select> */}
          </div>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySales}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-3xl font-bold text-gray-900">100%</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {categorySales.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">{entry.name}</span>
                <span className="text-sm font-semibold text-gray-900">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">Order Chart</h2>
            </div>
            {/* <select className="bg-gray-100 text-sm px-3 py-1 rounded-lg border-none">
              <option>Weekly</option>
              <option>Monthly</option>
            </select> */}
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#339AF0" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#339AF0' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;