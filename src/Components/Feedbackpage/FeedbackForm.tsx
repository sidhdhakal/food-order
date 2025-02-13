import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useCreateFeedback } from "../../Queries/feedback/useCreateFeedback";

const FeedbackForm = ({ order, setfeedbackOpen }: any) => {
  const [ratings, setRatings] = useState(
    Object.fromEntries(order?.items.map((item: any) => [item.itemId, 0]))
  );
  const [feedback, setFeedback] = useState("");

  const handleRatingChange = (itemId: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [itemId]: rating
    }));
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { createFeedback } = useCreateFeedback();
  
  const handleSubmit = () => {
    const feedbackData = {
      orderId: order._id,
      ratings: Object.entries(ratings).map(([itemId, rating]) => ({
        itemId,
        rating,
        feedback
      })),
      feedback
    };
    createFeedback(feedbackData);
    setfeedbackOpen(false);
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setfeedbackOpen(false);
      }}
      className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/10 backdrop-blur-md z-[100]"
    >
      <div
        onClick={handleFormClick}
        className="mx-auto p-4 bg-white shadow-md rounded-2xl min-w-[20rem] lg:min-w-[25rem]"
      >
        <h1 className="font-bold mb-4 text-center text-[1.5rem] 4xl:text-[2rem]">
          Give Your Feedback
        </h1>
        
        <div className="mb-2 flex justify-s">
          <p className="text-zinc-600">Order ID:</p>
          <p className="text-zinc-800">&nbsp;#{order._id.slice(-5)}</p>
        </div>
        
        <div className="mb-2 flex justify-s">
          <p className="text-zinc-600">Order Date:</p>
          <p className="text-zinc-800">&nbsp;{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        
        <div className="mb-4 flex justify-s">
          <p className="text-zinc-600">Total Amount:</p>
          <p className="text-zinc-800">&nbsp;Rs {order.total}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-4">
          {order.items.map((item: any) => (
            <div key={item._id} className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.size} | Qty: {item.quantity} | Rs {item.price}
                </p>
              </div>

              <div className="flex items-center space-x-1">
                <p className="mr-2">Rate this item:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(item.itemId, star)}
                    className={`focus:outline-none ${
                      ratings[item.itemId] >= star ? "text-orange-400" : "text-gray-300"
                    }`}
                  >
                    <Icon icon="iconamoon:star-fill" className="text-xl" />
                  </button>
                ))}
                <span className="ml-2">({ratings[item.itemId]}/5)</span>
              </div>
            </div>
          ))}
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full aspect-[1/0.3] bg-zinc-100 rounded-[16px] sm:rounded-lg p-2 mb-4 sm:p-3 text-xs sm:text-sm focus:outline-none active:outline-none"
          placeholder="Write your feedback here"
        />

        <button 
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;