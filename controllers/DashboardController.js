const Food = require("../models/Food");
const Order = require("../models/Order");
const User = require("../models/User");

exports.getData = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    
    const orders = await Order.find({
      createdAt: { $gte: start, $lte: end },
    });

    const totalOrders = orders.length;

    const cancelledOrders = orders.filter(
      (order) => order.currentStatus.status === "Cancelled"
    ).length;
    
    const deliveredOrdersArray = orders.filter(
      (order) => order.currentStatus.status === "Completed"
    );
    const deliveredOrders = deliveredOrdersArray.length;

    const revenueItems = deliveredOrdersArray.flatMap((order) => order.items);
    const items = orders.flatMap((order) => order.items);

    const fastFood = items.filter(
      (item) => item.category === "Fast Food"
    ).length;
    const beverages = items.filter(
      (item) => item.category === "Beverages"
    ).length;
    const mainCourse = items.filter(
      (item) => item.category === "Main Course"
    ).length;
    const snacks = items.filter((item) => item.category === "Snacks").length;
    const desserts = items.filter(
      (item) => item.category === "Desserts"
    ).length;
    const healthyOptions = items.filter(
      (item) => item.category === "Healthy Options"
    ).length;

    const totalItems = items.length;

    const categorySales = [
      {
        name: "Fast Food",
        value: Math.floor((fastFood / totalItems) * 100 * 100) / 100,
      },
      {
        name: "Beverages",
        value: Math.floor((beverages / totalItems) * 100 * 100) / 100,
      },
      {
        name: "Main Course",
        value: Math.floor((mainCourse / totalItems) * 100 * 100) / 100,
      },
      {
        name: "Snacks",
        value: Math.floor((snacks / totalItems) * 100 * 100) / 100,
      },
      {
        name: "Desserts",
        value: Math.floor((desserts / totalItems) * 100 * 100) / 100,
      },
      {
        name: "Healthy Options",
        value: Math.floor((healthyOptions / totalItems) * 100 * 100) / 100,
      },
    ];

    const revenue = revenueItems.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);

    const todayNepal = new Date();

    const sevenDaysAgoNepal = new Date();
    sevenDaysAgoNepal.setHours(0, 0, 0, 0); 
    sevenDaysAgoNepal.setDate(sevenDaysAgoNepal.getDate() - 7); 

    const ordersSevenDays = await Order.find({
      createdAt: { $gte: sevenDaysAgoNepal, $lte: todayNepal },
      "currentStatus.status": { $in: ["Completed", "Cancelled"] },
    });

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const orderCounts = daysOfWeek.map((day) => ({ name: day, orders: 0 }));

    ordersSevenDays.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const dayOfWeek = orderDate.getDay();
      orderCounts[dayOfWeek].orders += 1;
    });

    // ---------- NEW CODE: AVERAGE PREPARATION TIME ----------
    
    // Calculate average preparation time (from "Preparing" to "Ready for Pickup")
    const ordersWithPrepTime = orders.filter(order => {
      const preparingStatus = order.statusHistory.find(status => status.status === "Preparing");
      const readyStatus = order.statusHistory.find(status => status.status === "Ready for Pickup");
      return preparingStatus && readyStatus;
    });

    let totalPrepTimeMinutes = 0;
    ordersWithPrepTime.forEach(order => {
      const preparingStatus = order.statusHistory.find(status => status.status === "Preparing");
      const readyStatus = order.statusHistory.find(status => status.status === "Ready for Pickup");
      
      const prepTimeMs = new Date(readyStatus.time) - new Date(preparingStatus.time);
      const prepTimeMinutes = prepTimeMs / (1000 * 60); // Convert to minutes
      totalPrepTimeMinutes += prepTimeMinutes;
    });

    const avgPrepTimeMinutes = ordersWithPrepTime.length > 0 
      ? Math.round((totalPrepTimeMinutes / ordersWithPrepTime.length) * 10) / 10 
      : 0;

    
    const hourCounts = Array(24).fill(0).map((_, index) => ({ 
      hour: index, 
      orders: 0 
    }));

    orders.forEach(order => {
      const orderHour = new Date(order.createdAt).getHours();
      hourCounts[orderHour].orders += 1;
    });

    const sortedHours = [...hourCounts].sort((a, b) => b.orders - a.orders);
    const peakHours = sortedHours.slice(0, 3).map(hour => ({
      hour: hour.hour,
      orders: hour.orders,
      formattedTime: `${hour.hour}:00 - ${(hour.hour + 1) % 24}:00`
    }));

    
    const foodFrequencyMap = {};
    const foodTotalQuantityMap = {};
    const foodTotalRevenueMap = {}; 
    
    // Filter only completed orders
    const completedOrders = orders.filter(
      (order) => order.currentStatus.status === "Completed"
    );
    
    // Use completedOrders instead of all orders
    completedOrders.forEach(order => {
      order.items.forEach(item => {
        if (!foodFrequencyMap[item.name]) {
          foodFrequencyMap[item.name] = 0;
          foodTotalQuantityMap[item.name] = 0;
          foodTotalRevenueMap[item.name] = 0;
        }
        foodFrequencyMap[item.name] += 1;
        foodTotalQuantityMap[item.name] += item.qty;
        foodTotalRevenueMap[item.name] += item.price * item.qty;
      });
    });

    const foodFrequencyArray = Object.keys(foodFrequencyMap).map(name => ({
      name,
      orderFrequency: foodFrequencyMap[name],
      totalQuantity: foodTotalQuantityMap[name],
      totalRevenue: foodTotalRevenueMap[name], // Include total revenue in the object
      category: items.find(item => item.name === name)?.category || "Unknown"
    }));

    const sortedFoodByFrequency = [...foodFrequencyArray].sort((a, b) => {
      if (b.orderFrequency !== a.orderFrequency) {
        return b.orderFrequency - a.orderFrequency;
      }
      return b.totalQuantity - a.totalQuantity;
    });

    const mostLovedFood = sortedFoodByFrequency.slice(0, 5);

    const dashboardData = {
      stats: [
        {
          title: "Total Orders",
          value: totalOrders,
        },
        {
          title: "Total Delivered",
          value: deliveredOrders,
        },
        {
          title: "Total Canceled",
          value: cancelledOrders,
        },
        {
          title: "Total Pending",
          value: totalOrders - (deliveredOrders + cancelledOrders),
        },
        {
          title: "Total Revenue",
          value: revenue,
        },
        {
          title: "Avg Prep Time",
          value: avgPrepTimeMinutes,
        },
      ],
      categorySales: categorySales,
      chartData: orderCounts,
      peakHours: peakHours,
      mostLovedFood: mostLovedFood,
      hourlyDistribution: hourCounts,
      avgPrepTime: {
        minutes: avgPrepTimeMinutes,
        ordersAnalyzed: ordersWithPrepTime.length
      }
    };

    res.status(200).json({
      success: true,
      doc: dashboardData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

function getNepalTime() {
  const now = new Date();
  const nepalOffset = 5.75 * 60 * 60 * 1000; // 5 hours and 45 minutes in milliseconds
  return new Date(now.getTime() + nepalOffset); // Add the Nepal offset to UTC time
}