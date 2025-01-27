import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/Input";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Category {
  id: number;
  name: string;
  icon: string;
}

const EditCategoriesForm = ({
  onClose,
  categories,
}: {
  onClose: () => void;
  categories: Category[];
}) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories]);

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newCategories = [...categoryList];
        newCategories[index] = {
          ...newCategories[index],
          icon: event.target?.result as string,
        };
        setCategoryList(newCategories);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const addCategory = () => {
    setCategoryList([
      ...categoryList,
      {
        id: Date.now(), // temporary ID for new categories
        name: "",
        icon: "",
      },
    ]);
  };

  const updateCategory = (
    index: number,
    field: keyof Category,
    value: string | number
  ) => {
    const newCategories = [...categoryList];
    newCategories[index] = {
      ...newCategories[index],
      [field]: value,
    };
    setCategoryList(newCategories);
  };

  const removeCategory = (index: number) => {
    const newCategories = categoryList.filter((_, i) => i !== index);
    setCategoryList(newCategories);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Categories:", categoryList);
    // Add your update logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 dialog">
      <h2 className="text-xl font-semibold mb-4">Edit Categories</h2>

      {categoryList.map((category, index) => (
        <div
          key={category.id}
          className="p-4 border rounded-lg mb-4 bg-gray-50"
        >
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <Input
                type="text"
                value={category.name}
                onChange={(e) => updateCategory(index, "name", e.target.value)}
                required
              />
            </div>

            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <div className="relative border-2 border-dashed rounded-lg p-2 transition-colors">
                <Input
                  type="file"
                  onChange={(e) => handleImageChange(index, e)}
                  id={`icon-change-${index}`}
                  className="hidden"
                />
                <label
                  htmlFor={`icon-change-${index}`}
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                >
                  {category.icon ? (
                    <img
                      src={category.icon}
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

            <button
              type="button"
              onClick={() => removeCategory(index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
            <Icon icon="fluent:delete-32-regular" className="text-xl" />
              
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCategory}
        className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center gap-2"
      >
        <Icon icon='' className="w-5 h-5" />
        Add Category
      </button>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditCategoriesForm;
