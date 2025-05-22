import { useState, useMemo } from "react";
import Title from "../UI/Title";
import { Icon } from "@iconify/react/dist/iconify.js";
import OrderListItem from "./OrderListItem";
import { useGetOlderOrders } from "../../Queries/order/useGetOlderOrders";
import Loading from "../UI/Loading";
import IsError from "../UI/IsError";
import { Order } from "../../Utils/types";

const filterOptions = [
  { value: "All Orders", label: "All Orders", icon: "ph:list" },
  { value: "Completed", label: "Completed", icon: "ph:thumbs-up" },
  { value: "Cancelled", label: "Cancelled", icon: "ph:thumbs-down" },
  { value: "Not Paid", label: "Not Paid", icon: "ph:warning" },
  { value: "esewa", label: "Esewa", icon: "ph:credit-card" },
  { value: "cash", label: "Cash", icon: "ph:money" },
];

const ITEMS_PER_PAGE = 10;

const PreviousOrders = () => {
  const [filterOption, setFilterOption] = useState("All Orders");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, isError } = useGetOlderOrders();

  const filteredOrders = useMemo(() => {
    if (!data?.doc) return [];
    
    if (filterOption === "All Orders") {
      return data.doc;
    }
    
    if (filterOption === "Not Paid" || filterOption === "esewa" || filterOption === "cash") {
      return data.doc.filter((order:Order) => order?.paymentMethod === filterOption);
    }
    
    return data.doc.filter((order:Order) => order?.currentStatus?.status === filterOption);
  }, [data?.doc, filterOption]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleFilterChange = (newFilter:string) => {
    setFilterOption(newFilter);
    setCurrentPage(1);
  };

  const goToPage = (page:number ) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white rounded-xl shadow-sm">
        <div className="flex items-center text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={()=>setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === 1
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Icon icon="ph:caret-double-left" className="" />
          </button>
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === 1
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Icon icon="ph:caret-left" className="" />
          </button>

          <div className="flex items-center space-x-1">
            {getPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() => pageNum !== '...' && goToPage(Number(pageNum))}
                disabled={pageNum === '...'}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  pageNum === currentPage
                    ? 'bg-primary-500 text-white'
                    : pageNum === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Icon icon="ph:caret-right" className="" />
          </button>
          <button
            onClick={()=>setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Icon icon="ph:caret-double-right" className="" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Title>Previous Orders</Title>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
          <Icon icon="icon-park-twotone:filter" className="text-gray-500 text-2xl" />
          <select
            className="bg-transparent border-none outline-none text-gray-600"
            value={filterOption}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <Loading>Loading...</Loading>}
      {isError && <IsError>Cannot get your Older orders</IsError>}
      
      {!isLoading && !isError && (
        <>
          <div className="flex flex-col gap-3 mt-4">
            {!filteredOrders || filteredOrders.length === 0 ? (
              <div className="py-10 text-center">
                <Icon icon="ph:package" className="text-6xl text-gray-300 mx-auto mb-4" />
                <div className="text-xl text-gray-400 mb-2">No Orders Found</div>
                <div className="text-sm text-gray-500">
                  {filterOption === "All Orders" 
                    ? "You haven't placed any orders yet." 
                    : `No orders match the "${filterOption}" filter.`
                  }
                </div>
              </div>
            ) : (
              <>
                {currentOrders.map((order:Order) => (
                  <OrderListItem key={order._id} order={order} />
                ))}
              </>
            )}
          </div>

          {/* Pagination Component */}
          <Pagination />
        </>
      )}
    </div>
  );
};

export default PreviousOrders;