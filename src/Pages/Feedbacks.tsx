import { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const Feedbacks = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Assuming `userId` is provided (or customerName), this is used to filter reviews
  const userId = "John Doe"; // Replace with actual logged-in user info (e.g., context or prop)

  // Sample feedback categories
  const categories = [
    { id: 1, name: 'All Feedback', icon: 'icon-park-twotone:all-application' },
    { id: 2, name: 'Food Quality', icon: 'icon-park-twotone:cooking' },
    { id: 3, name: 'Service', icon: 'icon-park-twotone:people' },
    { id: 4, name: 'App Experience', icon: 'icon-park-twotone:mobile' },
    { id: 5, name: 'Delivery', icon: 'icon-park-twotone:delivery' }
  ];

  // Sample feedback data
  const feedbacks = [
    {
      id: "FB001",
      orderId: "ORD123",
      date: "2025-01-17",
      category: "Food Quality",
      rating: 5,
      title: "Amazing Burger!",
      comment: "The chicken burger was perfectly cooked and very tasty. Will order again!",
      items: ["Chicken Burger", "French Fries"],
      customerName: "John Doe", // Replace with `userId` or `customerId` as needed
      response: {
        text: "Thank you for your wonderful feedback! We're glad you enjoyed your meal.",
        date: "2025-01-17",
        from: "Restaurant Manager"
      }
    },
    {
      id: "FB002",
      orderId: "ORD124",
      date: "2025-01-17",
      category: "Service",
      rating: 4,
      title: "Quick Service",
      comment: "Food was prepared quickly, but would appreciate if the staff were more friendly.",
      items: ["Veggie Pizza"],
      customerName: "Jane Smith", // Replace with `userId` or `customerId` as needed
      response: null
    },
    {
      id: "FB003",
      orderId: "ORD120",
      date: "2025-01-16",
      category: "App Experience",
      rating: 3,
      title: "App Needs Improvement",
      comment: "The app is good but sometimes crashes during payment.",
      items: ["Chicken Wings", "Sprite"],
      customerName: "Mike Johnson", // Replace with `userId` or `customerId` as needed
      response: {
        text: "We apologize for the inconvenience. Our team is working on fixing the app issues.",
        date: "2025-01-16",
        from: "Technical Support"
      }
    }
  ];

  // Filter feedback by the logged-in user's reviews
  const userFeedbacks = feedbacks.filter(feedback => feedback.customerName === userId);

  const filteredFeedbacks = selectedCategory === '' || selectedCategory === 'All Feedback'
    ? userFeedbacks
    : userFeedbacks.filter(feedback => feedback.category === selectedCategory);

  const FeedbackCard = ({ feedback }: any) => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-start gap-2">
            <h2 className="text-lg font-bold">{feedback.title}</h2>
            <div className="px-3 py-1 mx-2 text-nowrap rounded-full text-sm bg-primary-100 text-primary-600">
              {feedback.category}
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Order #{feedback.orderId} • {feedback.date}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Icon
              key={index}
              icon="ph:star-fill"
              className={`text-xl ${index < feedback.rating ? 'text-yellow-400' : 'text-gray-200'}`}
            />
          ))}
        </div>
      </div>

      <div className="text-sm mb-3">{feedback.comment}</div>

      <div className="flex flex-wrap gap-2 mb-3">
        {feedback.items.map((item: string, index: number) => (
          <span
            key={index}
            className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Submitted by {feedback.customerName}
      </div>

      {feedback.response && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="ph:arrow-bend-up-right" className="text-primary-600" />
            <span className="font-medium">{feedback.response.from}</span>
            <span className="text-sm text-gray-500">• {feedback.response.date}</span>
          </div>
          <div className="text-sm">{feedback.response.text}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col home gap-y-8 overflow-y-auto text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
      <div>
        <h1 className="text-[3rem] leading-[1] mb-2">Feedback</h1>
        <p className="text-gray-500">View and manage customer feedback</p>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <div
            onClick={() => setSelectedCategory('')}
            className={`flex flex-col justify-center items-center p-2 aspect-square h-[7rem] rounded-2xl gap-y-2 border ${selectedCategory === '' ? 'border-primary-500 bg-primary-100/50' : 'border-transparent bg-zinc-100'}`}
          >
            <Icon icon="icon-park-twotone:all-application" className="text-[3rem] text-primary-600" />
            <h1 className="text-md">All Feedback</h1>
          </div>
          {categories.slice(1).map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col justify-center items-center p-2 aspect-square h-[7rem] rounded-2xl gap-y-2 border ${selectedCategory === category.name ? 'border-primary-500 bg-primary-100/50' : 'border-transparent bg-zinc-100'}`}
            >
              <Icon icon={category.icon} className="text-[3rem] text-primary-600" />
              <h1 className="text-md">{category.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{selectedCategory || 'All'} Reviews ({filteredFeedbacks.length})</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icon icon="ph:funnel" />
            <select className="bg-transparent border-none outline-none">
              <option>Most Recent</option>
              <option>Highest Rated</option>
              <option>Lowest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-4">
          {filteredFeedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
