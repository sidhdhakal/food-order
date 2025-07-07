import format from "date-fns/format";
import { Item } from "../../Utils/types";

// Define the types for the props
interface InvoicePrintProps {
  invoiceOrders: any[];
  submittedDateRange: {
    startDate: Date;
    endDate: Date;
  };
  isPrinting: boolean;
}

const InvoicePrintComponent = ({
  invoiceOrders,
  submittedDateRange,
  isPrinting,
}: InvoicePrintProps) => {
  const calculateTotalAmount = () => {
    return invoiceOrders.reduce((total, order) => {
      const orderTotal = order.items.reduce((itemTotal: number, item: Item) => {
        return itemTotal + (item.price * item.qty);
      }, 0);
      
      return total + orderTotal;
    }, 0);
  };

  const totalAmount = calculateTotalAmount();

  // Get unique users from the invoice orders
  const uniqueUsers = Array.from(
    new Set(invoiceOrders.map(order => order.user?.email))
  ).map(email => {
    return invoiceOrders.find(order => order.user?.email === email)?.user;
  });

  return (
    <div className={`${isPrinting ? "block" : "hidden"}`}>
      <div className="p-8 bg-white max-w-full mx-auto">
        {/* Invoice Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">INVOICE</h1>
        </div>

        {/* Customer & Date Information */}
        <div className="flex justify-between mb-6">
          <div className="w-1/2">
            <p className="font-semibold">Customer Information:</p>
            {uniqueUsers.length > 1 ? (
              uniqueUsers.map((user, index) => (
                <div key={index}>
                  <p>{user?.name || "N/A"}</p>
                  <p>{user?.email || "N/A"}</p>
                </div>
              ))
            ) : (
              <div>
                <p>{uniqueUsers[0]?.name || "N/A"}</p>
                <p>{uniqueUsers[0]?.email || "N/A"}</p>
              </div>
            )}
          </div>
          <div className="w-1/2 text-right">
            <p className="font-semibold">Date Range:</p>
            <p>From: {format(submittedDateRange.startDate, "MMM dd, yyyy")}</p>
            <p>To: {format(submittedDateRange.endDate, "MMM dd, yyyy")}</p>
            <p>Print Date: {format(new Date(), "MMM dd, yyyy")}</p>
          </div>
        </div>

        {/* Orders Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Order ID</th>
              <th className="border border-gray-300 p-2 text-left">Date</th>
              <th className="border border-gray-300 p-2 text-left">Items</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Payment</th>
            </tr>
          </thead>
          <tbody>
            {invoiceOrders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-300 p-2">
                  {order._id.substring(0, 8)}
                </td>
                <td className="border border-gray-300 p-2">
                  {format(
                    new Date(order.orderedOn || order.createdAt),
                    "MMM dd, yyyy"
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.items.map((item: Item) => (
                    <div key={item._id} className="w-full h-full">
                      <h1>
                        {item.name}{" "}
                        <span className="text-zinc-600">
                          {item.qty}x ({item.size})
                        </span>
                      </h1>
                    </div>
                  ))}
                   <div className="text-nowrap">Total Payment: <span className="font-semibold">Rs {order.items.reduce((total:number, currentItem:any) => total + currentItem.price * currentItem.qty, 0)}</span></div>
                </td>
                <td className="border border-gray-300 p-2">
                  {order.currentStatus ? order.currentStatus.status : "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.paymentMethod || "cash"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="text-right mt-8">
          <p className="font-semibold">
            Total Amount: Rs {totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintComponent;
