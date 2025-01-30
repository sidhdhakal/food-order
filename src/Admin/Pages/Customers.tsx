import { useState, useMemo } from "react";
import SearchInput from "../../Components/UI/SearchInput";
import DialogModal from "../../Components/DialogModal";
import toast from "react-hot-toast";
import CustomerCard from "../AdminComponents/CustomerCard";
import { useGetCustomers } from "../../Queries/useGetCustomers";
import { useDeleteCustomer } from "../../Queries/useDeleteCustomer";
import { useUpdateCustomer } from "../../Queries/useUpdateCustomer";

const Customers = () => {
  const { data, isLoading, error, isError} = useGetCustomers();
  const {deleteCustomer, isPending} = useDeleteCustomer()
  const {updateCustomer, isPending:isupdateCustomerPending}=useUpdateCustomer()

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
          onConfirm={handleDeleteUser}
          onCancel={() => setDeleteDialogOpen(null)}
        />
      )}
      
      <div className="auto w-full flex justify-between items-start">
        <SearchInput
          className="flex"
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
        
        <table className="w-full border-collapse">
          <thead className="bg-zinc-100">
            <tr>
              <th className="p-4 pl-2 text-left w-[10%]"></th>
              <th className="p-4 pl-2 text-left w-[25%]">Name</th>
              <th className="p-4 pl-2 text-left w-[25%]">Email</th>
              <th className="p-4 pl-2 text-left w-[10%]">isVerified</th>
              <th className="p-4 pl-2 text-left w-[10%]">Status</th>
              <th className="p-4 pl-2 text-left w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer:any) => (
              <CustomerCard 
                key={customer._id}
                customer={customer} 
                setDeleteDialogOpen={setDeleteDialogOpen}
                isPending={isPending}
                handleUserStatus={handleUserStatus}
                isupdateCustomerPending={isupdateCustomerPending}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;