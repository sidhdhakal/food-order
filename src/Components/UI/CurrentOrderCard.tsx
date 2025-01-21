import { Icon } from "@iconify/react/dist/iconify.js";

const CurrentOrderCard = ({currentOrder}:any) => (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{currentOrder.id}</h2>
            <div
              className={`px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800`}
            >
              {currentOrder.status}
            </div>
          </div>
          {/* <p className="text-sm text-gray-500 mt-1">Estimated Time: {currentOrder.estimatedTime}</p> */}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">{currentOrder.date}</div>
          <div className="font-bold mt-1">${currentOrder.total.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Order Items */}
        <div className="flex-1">
          <h3 className="font-medium mb-3">Order Items</h3>
          <div className="space-y-2">
            {currentOrder.items.map((item:any, index:number) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.quantity}x</span>{" "}
                  {item.name}
                  <span className="text-sm text-gray-500 ml-2">
                    ({item.size})
                  </span>
                </div>
                <div>${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Icon
              icon={
                currentOrder.payment === "Cash"
                  ? "ph:money"
                  : "simple-icons:esewa"
              }
              className="text-primary-600"
            />
            <span className="text-sm">{currentOrder.payment}</span>
          </div>
        </div>

        {/* Order Progress */}
        <div className="flex-1">
          <h3 className="font-medium mb-3">Order Progress</h3>
          <div className="space-y-2">
            {currentOrder.steps.map((step:any, index:number) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-green-500"
                      : step.status === "current"
                      ? "bg-yellow-500"
                      : "bg-gray-200"
                  }`}
                >
                  {step.status === "completed" && (
                    <Icon icon="ph:check-bold" className="text-white text-sm" />
                  )}
                  {step.status === "current" && (
                    <Icon icon="ph:clock" className="text-white text-sm" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span
                      className={`${
                        step.status === "completed"
                          ? "text-green-500"
                          : step.status === "current"
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                  {index < currentOrder.steps.length - 1 && (
                    <div
                      className={`w-px h-4 ml-3 ${
                        step.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
export default CurrentOrderCard