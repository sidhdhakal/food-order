import { useState } from "react";
import { Icon } from "@iconify/react";
import { useReplytoFeedback } from "../../Queries/feedback/useReplytoFeedback";

const FeedbackCard = ({ feedback }: { feedback: any }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const { replyToFeedback } = useReplytoFeedback();
  const handleSubmitReply = () => {
    if (replyText === "") return;
    replyToFeedback({ _id: feedback._id, reply: replyText });
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="grid gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{feedback.user.name}</h3>
            <p className="text-sm text-gray-500">{feedback.user.email}</p>
          </div>

          {!feedback.reply && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 transition-colors"
            >
              <Icon
                icon="mdi:message-reply"
                className="w-4 h-4 text-orange-500"
              />
              Reply
            </button>
          )}
        </div>

        <div className="bg-gray-50 p-3 rounded-lg flex gap-2">
          <Icon icon="carbon:user-feedback" className="w-5 h-5 text-gray-600 mt-0.5" />
          <p>{feedback?.feedback?feedback.feedback:'-'}</p>
        </div>

        {feedback.reply && (
          <div className="bg-gray-50 p-3 rounded-lg flex gap-2">
            <Icon
              icon="material-symbols:reply"
              className="w-5 h-5 text-orange-600 mt-0.5 rotate-180"
            />
            <p>{feedback.reply}</p>
          </div>
        )}

        {showReply && (
          <div className="space-y-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none bg-zinc-100"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReply(false)}
                className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReply}
                className="px-3 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                disabled={!replyText.trim()}
              >
                Send Reply
              </button>
            </div>
          </div>
        )}

        <div>

        <div className="border-t pt-3">
          <h4 className="font-medium mb-2">Order Items:</h4>
          <div className="space-y-2">
            {feedback.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} | Quantity: {item.qty}
                  </p>
                </div>
                <p className="font-medium">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-sm text-gray-500 flex items-center gap-2 mt-2">
          <Icon icon="mdi:clock-outline" className="w-4 h-4" />
          Submitted on: {new Date(feedback.createdAt).toLocaleDateString()}
        </div>
        </div>

      </div>
    </div>
  );
};

export default FeedbackCard;
