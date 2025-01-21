import { Icon } from "@iconify/react/dist/iconify.js";

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
  export default FeedbackCard