
const notifications = [
  {
    id: 1,
    type: 'special',
    title: "Today's Special Offer",
    message: "Get 20% off on all Italian dishes today!",
    time: "2 hours ago",
    color: "text-green-600"
  },
  {
    id: 2,
    type: 'order',
    title: "Order #1234 Delivered",
    message: "Your order has been delivered successfully",
    time: "3 hours ago",
    color: "text-blue-600"
  },
  {
    id: 3,
    type: 'status',
    title: "Order #1235 In Progress",
    message: "Your order is being prepared by the restaurant",
    time: "4 hours ago",
    color: "text-orange-600"
  }
];

const Notifications = () => {
  return (
    <div className="flex text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => {
            return (
              <div key={notification.id} className="bg-white rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 ${notification.color}`}>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold">{notification.title}</h2>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-sm text-gray-400 mt-2 block">{notification.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;