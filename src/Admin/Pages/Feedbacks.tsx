import { useGetAllFeedbacks } from "../../Queries/feedback/useGetAllFeedbacks";
import SearchInput from "../../Components/UI/SearchInput";
import { useMemo, useState, useEffect } from "react";
import FeedbackCard from "../AdminComponents/FeedbackCard";
import Loading from "../../Components/UI/Loading";
import IsError from "../../Components/UI/IsError";
import { Icon } from "@iconify/react/dist/iconify.js";
import paginationOptions from '../../Data/paginationvalues.json'
const Feedbacks = () => {
  const { data, isLoading, isError } = useGetAllFeedbacks();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [searchValue, setSearchValue] = useState("");

  const filteredFeedbacks = useMemo(() => {
    if (!data?.doc) return [];

    return data.doc.filter(
      (feedback: any) =>
        !searchValue ||
        feedback.user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        feedback.user.email.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data?.doc]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  // Pagination calculations
  const totalItems = filteredFeedbacks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(startIndex, endIndex);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  if (isLoading) return <Loading>Getting Feedbacks...</Loading>;

  if (isError) return <IsError>Failed to get Feedbacks</IsError>;

  return (
    <div className="w-full relative">
      <div className="auto w-full flex justify-between items-start">
        <SearchInput
          className="flex"
          placeholder="Search Feedback "
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>

      <div className="w-full mt-7 h-auto productlist rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4">
          <h1 className="text-[1.5rem] font-semibold">
            Customer Feedbacks ({filteredFeedbacks?.length})
          </h1>
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

        <div className="grid grid-cols-2 gap-8">
          {currentFeedbacks?.map((feedback: any) => (
            <FeedbackCard key={feedback._id} feedback={feedback} />
          ))}
        </div>

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
    </div>
  );
};

export default Feedbacks;
