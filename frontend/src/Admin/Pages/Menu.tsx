import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import SearchInput from "../../Components/UI/SearchInput";
import DialogLayout from "../AdminComponents/DialogLayout";
import AddProductForm from "../AdminComponents/AddProductForm";
import DialogModal from "../../Components/DialogModal";
import EditProductForm from "../AdminComponents/EditProductForm";
import Button from "../../Components/UI/Button";
import EditCategoriesForm from "../AdminComponents/EditCategoriesForm";
import { useGetCategory } from "../../Queries/category/useGetCategories";
import { Category, Food} from "../../Utils/types";
import ProductCard from "../AdminComponents/ProductCard";
import { useDeleteFood } from "../../Queries/food/useDeleteFood";
import { useGetAdminFoods } from "../../Queries/food/useGetAdminFoods";
import paginationOptions from '../../Data/paginationvalues.json'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: products, isLoading, isError } = useGetAdminFoods();
  const { data: categories } = useGetCategory();
  const {deleteFood, isPending:isDeletePending, isSuccess}=useDeleteFood()

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [searchValue, setSearchValue] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState({
    addProductForm: false,
    DeleteDialog: null,
    editCatgory: false,
  });

  const [editProductForm, setEditProductForm] = useState<{
    status: boolean;
    id: any;
  }>({
    status: false,
    id: undefined,
  });

  const filteredProducts = useMemo(() => {
    return products?.doc?.filter((product: Food) => {
      const matchesSearch =
        !searchValue ||
        product.name.toLowerCase().includes(searchValue.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, searchValue, products]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, selectedCategory]);

  // Pagination calculations
  const totalItems = filteredProducts?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, endIndex) || [];

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

  useEffect(()=>{
    if(isSuccess){
      setIsDialogOpen((prev:any)=>({...prev, DeleteDialog:null}))
    }
  },[isSuccess])

  return (
    <div className="w-full relative">
      <DialogLayout
        title="Add Product"
        isOpen={isDialogOpen.addProductForm}
        onClose={() =>
          setIsDialogOpen((prevState) => ({
            ...prevState,
            addProductForm: false,
          }))
        }
      >
        <AddProductForm
          onClose={() =>
            setIsDialogOpen((prevState) => ({
              ...prevState,
              addProductForm: false,
            }))
          }
        />
      </DialogLayout>

      <DialogLayout
        title="Edit Categories"
        isOpen={isDialogOpen.editCatgory}
        onClose={() =>
          setIsDialogOpen((prevState) => ({
            ...prevState,
            editCatgory: false,
          }))
        }
      >
        <EditCategoriesForm
        // onClose={() =>
        //   setIsDialogOpen((prevState) => ({
        //     ...prevState,
        //     editCatgory: false,
        //   }))
        // }
        />
      </DialogLayout>

      <DialogLayout
        title="Edit Product"
        isOpen={editProductForm.status}
        onClose={() =>
          setEditProductForm(() => ({
            id: null,
            status: false,
          }))
        }
      >
        <EditProductForm
          onClose={() =>
            setEditProductForm(() => ({
              id: null,
              status: false,
            }))
          }
          product={filteredProducts?.find((product:any)=>product._id==editProductForm.id) }
        />
      </DialogLayout>

      {isDialogOpen.DeleteDialog!==null && (
        <DialogModal
          isPending={isDeletePending}
          message={`Do you really want to delete the product ${filteredProducts.find((product:any)=>product._id==isDialogOpen.DeleteDialog)?.name }?`}
          btntext="Delete"
          pendingText="Deleting"
          onConfirm={() => {deleteFood(isDialogOpen.DeleteDialog); }}
          onCancel={() =>
            setIsDialogOpen((prevState) => ({
              ...prevState,
              DeleteDialog: null,
            }))
          }
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

        <div className=" flex gap-x-2">
          <Button
            onClick={() =>
              setIsDialogOpen((prevState) => ({
                ...prevState,
                editCatgory: true,
              }))
            }
            className="!text-black text-nowrap px-6 py-3 bg-zinc-100 border border-zinc-300 hover:bg-zinc-200"
          >
            Edit Categories
          </Button>

          <Button
            onClick={() =>
              setIsDialogOpen((prevState) => ({
                ...prevState,
                addProductForm: true,
              }))
            }
            className="w-fit px-6 py-3 text-nowrap rounded-xl bg-primary-300 flex gap-x-1 text-[1rem] !text-black border border=primary-300"
          >
            <Icon icon="akar-icons:plus" className="text-2xl text-black" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="w-full h-auto productlist mt-7 rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4 flex justify-between">
          <h1 className="text-[1.5rem] font-semibold">
            All Products ({filteredProducts?.length || 0})
          </h1>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option value="">All Categories</option>
            {categories?.doc?.map((category: Category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
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
            Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
          </div>
        </div>

        <table className="w-full border-collapse ">
          <thead className="bg-zinc-100 ">
            <tr>
              <th className="p-4 pl-2 text-left"></th>
              <th className="p-4 pl-2 text-left">Name</th>
              <th className="p-4 pl-2 text-left">Description</th>
              <th className="p-4 pl-2 text-left">Rating</th>
              <th className="p-4 pl-2 text-left">Category</th>
              <th className="p-4 pl-2 text-left">Sizes & Prices</th>
              <th className="p-4 pl-2 text-left">Availability</th>
              <th className="p-4 pl-2 text-left">Operations</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-red-500">
                  Failed to Fetch Foods
                </td>
              </tr>
            ) : currentProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No products found for the selected criteria
                </td>
              </tr>
            ) : (
              currentProducts.map((product: Food) => (
                <ProductCard 
                  key={product._id}
                  product={product} 
                  setIsDialogOpen={setIsDialogOpen} 
                  isDeletePending={isDeletePending}  
                  setEditProductForm={setEditProductForm} 
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

export default Menu;