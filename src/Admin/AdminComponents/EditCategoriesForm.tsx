import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../Components/UI/Button";
import AddCategoryForm from "./AddCategoryForm";
import CategoryCard from "./UI/CategoryCard";

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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 dialog">
      {categoryList.map((category, index) => (
      <CategoryCard category={category} index={index}/>
      ))}

      <AddCategoryForm />

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
