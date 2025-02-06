import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import SearchInput from "../../Components/UI/SearchInput";
import DialogLayout from "../AdminComponents/DialogLayout";
import AddProductForm from "../AdminComponents/AddProductForm";
import DialogModal from "../../Components/DialogModal";
import EditProductForm from "../AdminComponents/EditProductForm";
import Button from "../../Components/UI/Button";
import EditCategoriesForm from "../AdminComponents/EditCategoriesForm";
import { useGetFoods } from "../../Queries/food/useGetFoods";
import { useGetCategory } from "../../Queries/category/useGetCategories";
import { Food} from "../../Utils/types";
import ProductCard from "../AdminComponents/ProductCard";
import { useDeleteFood } from "../../Queries/food/useDeleteFood";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: products } = useGetFoods();
  const { data: categories } = useGetCategory();
  const {deleteFood, isPending:isDeletePending, isSuccess}=useDeleteFood()

  console.log(products);

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
            All Products ({filteredProducts?.length})
          </h1>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option value="">All Categories</option>
            {categories?.doc?.map((category: any) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <table className="w-full border-collapse ">
          <thead className="bg-zinc-100 ">
            <tr>
              <th className="p-4 pl-2 text-left"></th>
              <th className="p-4 pl-2 text-left">Name</th>
              <th className="p-4 pl-2 text-left">Description</th>
              <th className="p-4 pl-2 text-left">Category</th>
              <th className="p-4 pl-2 text-left">Sizes & Prices</th>
              <th className="p-4 pl-2 text-left">Availability</th>
              <th className="p-4 pl-2 text-left">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product: Food) => (
              <ProductCard product={product} setIsDialogOpen={setIsDialogOpen} isDeletePending={isDeletePending}  setEditProductForm={setEditProductForm} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;
