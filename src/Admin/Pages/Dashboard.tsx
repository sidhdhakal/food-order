import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  YAxis,
} from "recharts";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useGetData } from "../../Queries/useGetData";
import Loading from "../../Components/UI/Loading";
import IsError from "../../Components/UI/IsError";
import Button from "../../Components/UI/Button";

const Dashboard = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { data, isLoading, isError, refetch } = useGetData(dateRange);
  const handleSelect = (ranges:any) => {
    setDateRange(ranges.selection);
  };

  if (isLoading) return <Loading>Getting Data...</Loading>;

  if (isError) return <IsError>Failed to get Data</IsError>;

  // Format the hourly distribution data for chart display
  const formatHourlyData = () => {
    if (!data?.doc?.hourlyDistribution) return [];
    
    return data.doc.hourlyDistribution.map((item:any) => ({
      hour: `${item.hour}:00`,
      orders: item.orders
    }));
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="relative w-fit flex gap-x-2">
          <button
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Icon icon="mdi:calendar" className="text-gray-500" />
            <span className="text-sm text-gray-600 text-nowrap">
              {format(dateRange.startDate, "MMM dd, yyyy")} -{" "}
              {format(dateRange.endDate, "MMM dd, yyyy")}
            </span>
          </button>

          {showDatePicker && (
            <div className="absolute right-0 top-10 mt-2 z-50">
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
          <Button onClick={() => refetch()}>Submit</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {data?.doc?.stats.map((stat:any, index:number) => (
          <div key={index} className={`bg-white p-4 rounded-xl shadow-sm border-t-2 ${stats[index].borderColor}`}>
            <div className="flex items-start gap-4">
              <div className={`${stats[index]?.bgColor} p-3 rounded-lg`}>
                <Icon
                  icon={stats[index].icon}
                  className={`text-3xl 4xl:text-4xl ${stats[index].color}`}
                />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-lg  ${stats[index].color}`}>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {stat.title === "Total Revenue" && "Rs. "}
                      {stat.value}
                      {stat.title === "Avg Prep Time" && " min"}
                    </h3>
                  </span>
                </div>
                <p className="text-gray-500 text-md">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Details with Donut Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">Sales by Category</h2>
            </div>
          </div>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.doc?.categorySales}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {data?.doc?.categorySales.map((_:any, index:number) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index]} />
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
            {data?.doc?.categorySales.map((entry:any, index:number) => (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[index] }}
                />
                <span className="text-sm text-gray-600">{entry.name}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Order Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">Weekly Order Trend</h2>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.doc?.chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#339AF0"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#339AF0" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Peak Hours */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-6">Peak Hours</h2>
          <div className="space-y-4">
            {data?.doc?.peakHours?.map((hour:any, index:number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${peakHourColors[index].bg}`}>
                    <Icon 
                      icon="mdi:clock-time-four" 
                      className={`text-xl ${peakHourColors[index].text}`} 
                    />
                  </div>
                  <span className="ml-3 text-gray-700">{hour.formattedTime}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900">{hour.orders}</span>
                  <span className="ml-2 text-gray-500">orders</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Hourly Distribution Chart */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">24-Hour Order Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatHourlyData()}>
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(value) => value.split(':')[0]} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide={true} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#339AF0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

{/* Most Loved Food */}
<div className="bg-white p-6 rounded-xl shadow-sm">
  <h2 className="font-semibold text-gray-900 mb-4">Most Popular Items</h2>
  
  {/* Header Row - Table-like structure */}
  <div className="grid grid-cols-5 gap-2 mb-2 px-4 py-2 bg-gray-100 rounded-lg">
    <div className="text-sm font-medium text-gray-600">Item</div>
    <div className="text-sm font-medium text-gray-600">Category</div>
    <div className="text-sm font-medium text-gray-600 text-right">Orders</div>
    <div className="text-sm font-medium text-gray-600 text-right">Quantity</div>
    <div className="text-sm font-medium text-gray-600 text-right">Revenue</div>
  </div>
  
  {/* Item Rows */}
  <div className="space-y-2">
    {data?.doc?.mostLovedFood?.map((item:any, index:number) => (
      <div 
        key={index} 
        className="grid grid-cols-5 gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {/* Item Name with Icon */}
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-full ${foodCategoryColors[index % foodCategoryColors.length].bg}`}>
            <Icon 
              icon="fluent:food-16-filled" 
              className={`text-lg ${foodCategoryColors[index % foodCategoryColors.length].text}`} 
            />
          </div>
          <span className="font-medium text-gray-900 truncate">{item.name}</span>
        </div>
        
        {/* Category */}
        <div className="text-sm text-gray-600 flex items-center">{item.category}</div>
        
        {/* Order Count */}
        <div className="text-right">
          <span className="font-semibold text-gray-900">{item.orderFrequency}</span>
        </div>
        
        {/* Quantity */}
        <div className="text-right">
          <span className="font-medium text-gray-900">{item.totalQuantity}</span>
          <span className="text-xs text-gray-500 ml-1">units</span>
        </div>
        
        {/* Revenue */}
        <div className="text-right">
          <span className="font-semibold text-emerald-600">
            Rs. {item.totalRevenue?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
    ))}
  </div>
  
  {/* Summary Row */}
  {data?.doc?.mostLovedFood?.length > 0 && (
    <div className="mt-4 flex justify-end">
      <div className="bg-gray-100 px-4 py-2 rounded-lg">
        <span className="text-sm font-medium text-gray-700">
          Total Revenue (Top Items): 
        </span>
        <span className="ml-2 font-semibold text-emerald-600">
          Rs. {data.doc.mostLovedFood.reduce((sum:number, item:any) => sum + (item.totalRevenue || 0), 0).toFixed(2)}
        </span>
      </div>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default Dashboard;

const categoryColors = [
  "#FF6B6B",
  "#845EF7",
  "#FFA500",
  "#354AF0",
  "#ff9AF0",
  "#A8E6A3"
];

const stats = [
  {
    icon: "mdi:cart",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
    borderColor:"border-t border-emerald-500"
  },
  {
    icon: "mdi:package-variant", 
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    borderColor:"border-t border-purple-500"

  },
  {
    icon: "mdi:close-circle",
    color: "text-red-500",
    bgColor: "bg-red-100",
    borderColor:"border-t border-red-500"

  },
  {
    icon: "mdi:clock-outline", 
    color: "text-amber-500",  
    bgColor: "bg-amber-100",
    borderColor:"border-t border-amber-500"

  },
  {
    icon: "rivet-icons:money",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    borderColor:"border-t border-blue-500"

  },
  {
    icon: "mdi:timer",
    color: "text-teal-500",
    bgColor: "bg-teal-100",
    borderColor:"border-t border-emerald-500"

  },
];

const peakHourColors = [
  {
    bg: "bg-blue-100",
    text: "text-blue-500"
  },
  {
    bg: "bg-purple-100",
    text: "text-purple-500"
  },
  {
    bg: "bg-amber-100",
    text: "text-amber-500"
  }
];

const foodCategoryColors = [
  {
    bg: "bg-emerald-100",
    text: "text-emerald-500"
  },
  {
    bg: "bg-purple-100",
    text: "text-purple-500"
  },
  {
    bg: "bg-amber-100",
    text: "text-amber-500"
  },
  {
    bg: "bg-blue-100",
    text: "text-blue-500"
  },
  {
    bg: "bg-pink-100",
    text: "text-pink-500"
  }
];