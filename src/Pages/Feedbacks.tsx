import { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import feedbacks from '../Data/Feedbacks.json'
import categories from '../Data/FeedbackCategory.json'
import FeedbackCard from '../Components/UI/FeedbackCard';
const Feedbacks = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Assuming `userId` is provided (or customerName), this is used to filter reviews
  const userId = "John Doe"; // Replace with actual logged-in user info (e.g., context or prop)

  // Filter feedback by the logged-in user's reviews
  const userFeedbacks = feedbacks.filter(feedback => feedback.customerName === userId);

  const filteredFeedbacks = selectedCategory === '' || selectedCategory === 'All Feedback'
    ? userFeedbacks
    : userFeedbacks.filter(feedback => feedback.category === selectedCategory);



  return (
    <div className="flex flex-col home gap-y-8 overflow-y-auto text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-transparent ">
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
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
            <Icon icon="icon-park-twotone:filter" className="text-gray-500 text-2xl" />

            <select  className="bg-transparent border-none outline-none text-gray-600 pr-8">
              <option>Most Recent</option>
              <option>Highest Rated</option>
              <option>Lowest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
          {filteredFeedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
