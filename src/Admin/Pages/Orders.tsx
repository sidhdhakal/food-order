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
import paginationOptions from '../../Data/paginationvalues.json'

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
  isUpdated?: boolean;
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isError } = useGetAllOrders();
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);

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
      const style = document.createElement("style");
      style.id = "print-styles";
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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, statusFilter]);

  const filteredOrders = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    return filteredData.filter((order) => {
      if (!order.user || typeof order.user !== "object") return false;

      const name = order.user.name || "";
      const email = order.user.email || "";

      const matchesSearch =
        !searchValue ||
        name.toLowerCase().includes(searchValue.toLowerCase()) ||
        email.toLowerCase().includes(searchValue.toLowerCase());

      const matchesStatus =
        !statusFilter || order.currentStatus?.status === statusFilter;
      const matchesPayment =
        !paymentFilter || order.paymentMethod === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [searchValue, filteredData, statusFilter, paymentFilter]);

  // Pagination calculations
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  // Get completed or cancelled orders for invoice
  const invoiceOrders = useMemo(() => {
    // First filter by search value (for specific user)
    const userFilteredOrders = filteredOrders.filter(
      (order) =>
        order.currentStatus &&
        (order.currentStatus.status === "Completed" ||
          order.currentStatus.status === "Cancelled")
    );

    return userFilteredOrders;
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
      const filtered = data.doc.filter((order: any) => {
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

  const searchUserName = useMemo(() => {
    if (!searchValue || !filteredOrders.length) return null;

    return filteredOrders[0]?.user?.name || null;
  }, [searchValue, filteredOrders]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="w-full relative">
      <div className="auto w-full flex justify-between items-start">
        <SearchInput
          className="flex"
          placeholder="Search Orders by User"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>
      <div className="w-full h-auto min-h-[70vh] productlist mt-7 rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4 flex justify-between">
          <h1 className="text-[1.5rem] font-semibold">
            Orders ({filteredOrders?.length || 0})
            {searchValue && searchUserName && (
              <span className="ml-2 text-gray-500 text-sm">
                for {searchUserName}
              </span>
            )}
          </h1>

          <div className="relative w-fit flex gap-x-2">
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border rounded-md bg-white"
                value={statusFilter || ""}
                onChange={(e) => setStatusFilter(e.target.value || null)}
              >
                <option value="">All Statuses</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Order Confirmed">Order Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* Payment Method Filter */}
              <select
                className="px-4 py-2 border rounded-md bg-white"
                value={paymentFilter || ""}
                onChange={(e) => setPaymentFilter(e.target.value || null)}
              >
                <option value="">All Payment Methods</option>
                <option value="esewa">Esewa</option>
                <option value="Not Paid">Not Paid</option>
                <option value="cash">Cash</option>
              </select>
            </div>
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
              {isPrinting
                ? "Printing..."
                : searchValue
                ? `Print ${searchUserName || "User"} Invoice`
                : "Print All Invoices"}
            </Button>
          </div>
        </div>

        {/* Items per page and pagination info */}
        <div className="pb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              className="px-3 py-1 border rounded-md bg-white text-sm"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            >
              {paginationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="text-sm text-gray-600">
            Showing {totalItems === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, totalItems)} of {totalItems} entries
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
            ) : currentOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No orders found for the selected criteria
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-double-left" className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-left" className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-2 text-sm border rounded-md ${
                  currentPage === pageNum
                    ? "bg-primary-500 text-white border-primary-500"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Show ellipsis if there are more pages */}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-double-right" className="w-4 h-4" />
            </button>
          </div>
        )}
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
