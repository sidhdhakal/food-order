import { useState } from "react";
import Button from "../../Components/UI/Button";
import Input from "../../Components/UI/Input";
import { useAddCategory } from "../../Queries/category/useAddCategory";
import { Icon } from "@iconify/react/dist/iconify.js";

const AddCategoryForm = () => {
  const [newCategory, setNewCategory] = useState<{ name: string; icon: any }>({
    name: "",
    icon: null,
  });

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setNewCategory((category) => ({ ...category, icon: files[0] }));
    }
  };

  const { addCategory , isPending} = useAddCategory();
  const handleAddNewCategory = () => {
    console.log("Add", newCategory);
    if (newCategory.name == "") return;
    addCategory(newCategory);
  };
  console.log(newCategory);
  return (
    <div className="p-4 border rounded-lg mb-4 bg-gray-50">
      <h1 className="text-2xl mb-4">Add Category</h1>
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <Input
            type="text"
            value={newCategory.name}
            disabled={isPending}
            onChange={(e) =>
              setNewCategory((cat) => ({ ...cat, name: e.target.value }))
            }
            required
          />

          <Button  disabled={isPending} onClick={handleAddNewCategory} className="mt-4">
            {isPending?'Adding Category...':'Add Category'}
          </Button>
        </div>

        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icon
          </label>
          <div className="relative border-2 border-dashed rounded-lg p-2 transition-colors">
            <Input
              type="file"
              disabled={isPending}
              onChange={(e) => handleNewImage(e)}
              id={`icon-new`}
              className="hidden"
            />
            <label
              htmlFor={`icon-new`}
              className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              {newCategory.icon ? (
                <img
                  src={
                    newCategory.icon
                      ? URL.createObjectURL(newCategory.icon)
                      : ""
                  }
                  alt="Category icon"
                  className="w-16 h-16 object-contain rounded-lg"
                />
              ) : (
                <div className="p-2 rounded-full bg-blue-50">
                  <Icon
                    icon="lucide:upload"
                    className="w-8 h-8 text-blue-500"
                  />
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
