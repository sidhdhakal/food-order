import  { useState, useEffect } from "react";
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

  return (
    <div  className="space-y-4 mt-6 dialog">
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
    </div>
  );
};

export default EditCategoriesForm;
