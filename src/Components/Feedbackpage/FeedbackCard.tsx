import { Icon } from '@iconify/react/dist/iconify.js';
import { formatDistanceToNow } from 'date-fns';


const FeedbackCard = ({ feedback }:any) => {
  const formattedDate = formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true });
  const getItemRating = (itemId: string) => {
    const ratingObj = feedback.ratings.find((r: any) => r.itemId === itemId);
    return ratingObj ? ratingObj.rating : null;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            icon={star <= rating ? "ph:star-fill" : "ph:star"}
            className={star <= rating ? "text-yellow-400" : "text-gray-300"}
            width="16"
            height="16"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Order Feedback</h2>
          </div>
          <div className="text-md text-gray-500 mt-1">
            Order #{feedback.orderId.slice(-5)} • {formattedDate}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {feedback.items.map((item: any, index: number) => {
          const rating = getItemRating(item.itemId);
          return (
            <div key={index} className="flex justify-between items-center">
              <div className="flex  gap-x-2">
                <div>
                  <span className="font-medium">{item.qty}x</span> {item.name}
                  <span className="text-sm text-gray-500 ml-2">({item.size})</span>
                </div>
                {rating !== null && ( // Check for valid rating
                  <div className="mt-1">{renderStars(rating)}</div>
                )}
              </div>
              <div>Rs {item.price.toFixed(2)}</div>
            </div>
          );
        })}

      </div>
        <p className='text-zinc-700 text-lg'>{feedback?.feedback}</p>

      {feedback.reply ? (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="ph:arrow-bend-up-right" className="text-primary-600" />
            <span className=" text-gray-500">(Staff Response)  &nbsp;
              <span className='text-black'>{feedback.reply}</span>
            </span>
            {/* <span className="text-sm text-gray-500">
              • {formatDistanceToNow(new Date(feedback?.reply?.createdAt), { addSuffix: true })}
            </span> */}
          </div>
        </div>
      ) : (
        <div className="mt-4 text-sm text-gray-500 italic">
          No response yet
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
