import { Icon } from "@iconify/react/dist/iconify.js";
import { Food, FoodSize } from "../../Utils/types";
import { useUpdateFoodAvailability } from "../../Queries/food/useUpdateFoodAvailability";

const ProductCard = ({ product, setIsDialogOpen, setEditProductForm, isDeletePending }: { product: Food, setIsDialogOpen:any, setEditProductForm:any, isDeletePending:boolean }) => {
  const { updateFoodAvailability, isPending } = useUpdateFoodAvailability();
  const handleMenuAvailableStatus = (id: string | undefined, value: boolean) => {
    updateFoodAvailability({_id:id || '', available:value})
  };
  return (
    <tr key={product._id} className="border-b hover:bg-gray-50">
      <td className="p-2 ">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 min-w-16 object-cover rounded "
        />
      </td>
      <td className="p-2 ">{product.name}</td>
      <td className="p-2 ">{product.description}</td>
      <td className="p-2 ">{product.category}</td>
      <td className="p-2 ">
        {product.sizes.map((size: FoodSize) => (
          <div key={size.name}>
            {size.name}: ${size.price}
          </div>
        ))}
      </td>
      <td className="p-2">
        <button
          disabled={isPending}
          // disabled={isupdateCustomerPending}
          onClick={() =>
            handleMenuAvailableStatus(product._id, !product.available)
          }
          className={`px-3 py-1 rounded text-sm disabled:text-zinc-400 ${
            !product.available
              ? "bg-red-100 text-red-800 hover:bg-red-200"
              : "bg-green-100 text-green-800 hover:bg-green-200"
          }`}
        >
          {product.available ? "Available" : "Unavailable"}
        </button>
      </td>
      <td className="p-2 border-b">
        <div className="flex gap-2 justify-around">
          <button
          onClick={() =>
            setEditProductForm(() => ({
             status:true,
             id:product._id
            }))
          }
            disabled={isPending || isDeletePending}
            className="text-blue-600 hover:text-blue-800"
          >
            <Icon icon="cuida:edit-outline" className="text-2xl" />
          </button>
          <button
            onClick={() =>
              setIsDialogOpen((prevState:any) => ({
                ...prevState,
                DeleteDialog: product._id,
              }))
            }
            disabled={isPending || isDeletePending}
            className="text-red-600 hover:text-red-800"
          >
            <Icon icon="fluent:delete-32-regular" className="text-2xl" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductCard;
