import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import SearchInput from "../../Components/UI/SearchInput";
import DialogModal from "../../Components/DialogModal";
import CustomerCard from "../AdminComponents/CustomerCard";
import { useGetCustomers } from "../../Queries/useGetCustomers";
import { useDeleteCustomer } from "../../Queries/useDeleteCustomer";
import { useUpdateCustomer } from "../../Queries/useUpdateCustomer";

const Customers = () => {
  const { data, isLoading, error, isError} = useGetCustomers();
  const {deleteCustomer, isPending} = useDeleteCustomer()
  const {updateCustomer, isPending:isupdateCustomerPending}=useUpdateCustomer()

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [searchValue, setSearchValue] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    if (!data?.doc) return [];
    
    return data.doc.filter(
      (customer:any) =>
        !searchValue ||
        customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data?.doc]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, data]);

  // Pagination calculations
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

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

  const handleDeleteUser = () => {
    deleteCustomer(deleteDialogOpen)
    setDeleteDialogOpen('')
  };

  const handleUserStatus=(_id:string, isActive:boolean)=>{
    updateCustomer({_id, isActive})
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const customerToDelete = data?.doc?.find(
    (customer:any) => customer._id === deleteDialogOpen
  );

  return (
    <div className="w-full relative">
      {deleteDialogOpen !== null && (
        <DialogModal
          message={`Do you really want to delete ${customerToDelete?.name || 'this customer'}?`}
          btntext="Delete"
          isPending={isPending}
          pendingText="Deleting..."
          onConfirm={handleDeleteUser}
          onCancel={() => setDeleteDialogOpen(null)}
        />
      )}
      
      <div className="auto w-full flex justify-between items-start">
        <SearchInput
          className="flex"
          placeholder="Search Customer"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>
      
      {/* <button onClick={() => toast.success('Hello! I am Toast')}>
        TriggerToast
      </button> */}

      <div className="w-full h-auto productlist mt-7 rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4">
          <h1 className="text-[1.5rem] font-semibold">
            All Customers ({filteredCustomers.length})
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
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
          </div>
        </div>
        
        <table className="w-full border-collapse">
          <thead className="bg-zinc-100">
            <tr>
              <th className="p-4 pl-2 text-left w-[10%]"></th>
              <th className="p-4 pl-2 text-left w-[25%]">Name</th>
              <th className="p-4 pl-2 text-left w-[25%]">Email</th>
              <th className="p-4 pl-2 text-left w-[25%]">Joined On</th>
              <th className="p-4 pl-2 text-left w-[10%]">isVerified</th>
              <th className="p-4 pl-2 text-left w-[10%]">Status</th>
              <th className="p-4 pl-2 text-left w-[20%]">Actions</th>
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
                  Failed to Fetch Customers
                </td>
              </tr>
            ) : currentCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No customers found for the selected criteria
                </td>
              </tr>
            ) : (
              currentCustomers.map((customer:any) => (
                <CustomerCard 
                  key={customer._id}
                  customer={customer} 
                  setDeleteDialogOpen={setDeleteDialogOpen}
                  isPending={isPending}
                  handleUserStatus={handleUserStatus}
                  isupdateCustomerPending={isupdateCustomerPending}
                />
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
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
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

export default Customers;