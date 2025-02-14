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
    const deliveredOrders = orders.filter(
      (order) => order.currentStatus.status === "Completed"
    ).length;

    console.log(totalOrders, cancelledOrders, deliveredOrders);

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

    // Calculate total number of items to find percentages
    const totalItems = items.length;

    // Calculate percentages for each category
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

    const revenue = items.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);

    const todayNepal = getNepalTime();

const sevenDaysAgoNepal = new Date(todayNepal);
sevenDaysAgoNepal.setDate(todayNepal.getDate() - 7);

const ordersSevenDays = await Order.find({
  createdAt: { $gte: sevenDaysAgoNepal, $lte: todayNepal },
  'currentStatus.status': { $in: ['Completed', 'Cancelled'] }
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
          title:'Total Pending',
          value:totalOrders-(deliveredOrders+cancelledOrders)
        },
        {
          title: "Total Revenue",
          value: revenue,
        },
      ],
      categorySales: categorySales,
      chartData: orderCounts,
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
