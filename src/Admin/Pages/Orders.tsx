import { useMemo, useState, useEffect } from "react";
import { useGetAllOrders } from "../../Queries/order/useGetAllOrders";
import OrderCard from "../AdminComponents/OrderCard";
import SearchInput from "../../Components/UI/SearchInput";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import isWithinInterval from "date-fns/isWithinInterval";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "../../Components/UI/Button";
import InvoicePrintComponent from "../AdminComponents/InvoicePrintComponent";

// Define a basic type for orders
interface Order {
  _id: string;
  createdAt: string;
  orderedOn: string;
  user: {
    name: string;
    email: string;
  };
  currentStatus: {
    status: string;
  };
  items: any[];
  paymentMethod: string;
  message?: string;
  totalAmount: number;
}

const Orders = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  
  const [submittedDateRange, setSubmittedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  
  const { data, isLoading, isError } = useGetAllOrders();
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Order[]>([]);
  
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    setSubmittedDateRange({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    
    if (data?.doc) {
      setFilteredData(data.doc);
    }
  }, [data]);

  useEffect(() => {
    if (isPrinting) {
      const style = document.createElement('style');
      style.id = 'print-styles';
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
      
      window.print();
      
      setTimeout(() => {
        document.head.removeChild(style);
        setIsPrinting(false);
      }, 1000);
    }
  }, [isPrinting]);

  const filteredOrders = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    return filteredData.filter((order) => {
      if (!order.user || typeof order.user !== 'object') return false;
      
      const name = order.user.name || '';
      const email = order.user.email || '';
      
      return !searchValue || 
        name.toLowerCase().includes(searchValue.toLowerCase()) ||
        email.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, filteredData]);

  const invoiceOrders = useMemo(() => {
    return filteredOrders.filter(order => 
      order.currentStatus && 
      (order.currentStatus.status === 'Completed' || order.currentStatus.status === 'Cancelled')
    );
  }, [filteredOrders]);

 

  const handleSelect = (ranges: any) => {
    setDateRange(ranges.selection);
  };

  const handleSubmit = () => {
    setSubmittedDateRange({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    
    if (data?.doc && Array.isArray(data.doc)) {
      const filtered = data.doc.filter((order:any) => {
        if (!order.createdAt) return false;
        
        const orderDate = new Date(order.createdAt);
        
        const startDate = new Date(dateRange.startDate);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(dateRange.endDate);
        endDate.setHours(23, 59, 59, 999);
        
        if (isNaN(orderDate.getTime())) return false;
        
        return isWithinInterval(orderDate, {
          start: startDate,
          end: endDate,
        });
      });
      
      setFilteredData(filtered);
    }
    
    setShowDatePicker(false);
  };

  const handlePrint = () => {
    if (invoiceOrders.length > 0) {
      setIsPrinting(true);
    }
  };

  return (
    <div className="w-full relative">
      <div className="auto w-full flex justify-between items-start">
        <SearchInput
          className="flex"
          placeholder="Search Orders "
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="w-full h-auto min-h-[70vh] productlist mt-7 rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4 flex justify-between">
          <h1 className="text-[1.5rem] font-semibold">
            Orders ({filteredOrders?.length || 0})
          </h1>

          <div className="relative w-fit flex gap-x-2">
            <button
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <Icon icon="mdi:calendar" className="text-gray-500" />
              <span className="text-sm text-gray-600 text-nowrap">
                {format(submittedDateRange.startDate, "MMM dd, yyyy")} -{" "}
                {format(submittedDateRange.endDate, "MMM dd, yyyy")}
              </span>
            </button>

            {showDatePicker && (
              <div className="absolute right-0 top-10 mt-2 z-50">
                <div className="bg-white rounded-lg shadow-lg p-2">
                  <DateRange
                    ranges={[dateRange]}
                    onChange={handleSelect}
                    months={1}
                    direction="vertical"
                    className="border rounded"
                  />
                  <div className="flex justify-end mt-2 gap-2">
                    <button
                      className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1"
                      onClick={() => setShowDatePicker(false)}
                    >
                      Cancel
                    </button>
                    <Button onClick={handleSubmit}>Apply</Button>
                  </div>
                </div>
              </div>
            )}
            <Button onClick={handleSubmit}>Submit</Button>
            <Button 
              onClick={handlePrint}
              disabled={invoiceOrders.length === 0 || isPrinting}
              className="flex items-center gap-1 !text-nowrap"
            >
              <Icon icon="mdi:printer" className="text-white" />
              {isPrinting ? "Printing..." : "Print Invoice"}
            </Button>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead className="bg-zinc-100">
            <tr>
              <th className="p-4 pl-2 text-left w-[5%]"></th>
              <th className="p-4 pl-2 text-left w-[20%]">User</th>
              <th className="p-4 pl-2 text-left w-[12%]">Items</th>
              <th className="p-4 pl-2 text-left w-[10%]">Ordered On</th>
              <th className="p-4 pl-2 text-left w-[15%]">Message</th>
              <th className="p-4 pl-2 text-left w-[10%]">Status</th>
              <th className="p-4 pl-2 text-left w-[10%]">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-red-500">
                  Failed to Fetch Orders
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No orders found for the selected criteria
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="print-section">
        <InvoicePrintComponent 
          invoiceOrders={invoiceOrders} 
          submittedDateRange={submittedDateRange} 
          isPrinting={isPrinting}
        />
      </div>
    </div>
  );
};

export default Orders;