import { useState, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import SearchInput from "../../Components/UI/SearchInput";
import DialogModal from "../../Components/DialogModal";
import customers from '../../Data/Users.json'

const Customers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [customerList, setCustomerList] = useState(customers);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<any>(null);

  const filteredCustomers = useMemo(() => {
    return customerList.filter(
      (customer) =>
        !searchValue ||
        customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, customerList]);

  const toggleUserStatus = (customerId: number) => {
    setCustomerList((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId
          ? { ...customer, isActive: !customer.isActive }
          : customer
      )
    );
  };

  const handleDeleteUser = () => {
    setCustomerList((prevCustomers) => 
      prevCustomers.filter((customer) => customer.id !== deleteDialogOpen)
    );
    setDeleteDialogOpen(null);
  };

  return (
    <div className="w-full relative">
      {deleteDialogOpen !== null && (
        <DialogModal
          message={`Do you really want to delete ${customers[0].name}?`}
          btntext="Delete"
          onConfirm={handleDeleteUser}
          onCancel={() => {
            setDeleteDialogOpen(null);
          }}
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
              <th className="p-4 pl-2 text-left w-[10%]">isVerfied</th>
              <th className="p-4 pl-2 text-left w-[10%]">Status</th>
              <th className="p-4 pl-2 text-left w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-b w-full hover:bg-gray-50">
                <td className="p-2 w-[10%] ">
                  <img
                    src={customer.picture}
                    alt={customer.name}
                    className="w-16 h-16 min-w-16 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 w-[25%]">{customer.name}</td>
                <td className="p-2 w-[25%]">{customer.email}</td>

                <td className="p-2 w-[10%]">
                  <Icon icon='icon-park-twotone:check-one' className="text-center text-2xl text-orange-400" />
                </td>
                <td className="p-2 w-[10%]">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      customer.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.isActive ? "Active" : "Blocked"}
                  </span>
                </td>

               
                <td className="p-2 w-[20%]">
                  <div className="flex items-center justify-between gap-2 max-w-[12rem]">
                    <button
                      onClick={() => toggleUserStatus(customer.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        customer.isActive
                          ? "bg-red-100 text-red-800 hover:bg-red-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                      }`}
                    >
                      {customer.isActive ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => setDeleteDialogOpen(customer.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Icon
                        icon="fluent:delete-32-regular"
                        className="text-2xl"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;