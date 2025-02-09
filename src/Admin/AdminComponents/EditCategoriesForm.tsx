import AddCategoryForm from "./AddCategoryForm";
import CategoryCard from "./UI/CategoryCard";
import { useGetCategory } from "../../Queries/category/useGetCategories";
import { Category } from "../../Utils/types";


const EditCategoriesForm = ({}) => {
  const { data, isLoading, error, isError} = useGetCategory();
  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="space-y-4 mt-4 dialog relative">
      {data.doc.map((category: Category, index: number) => (
        <CategoryCard key={index} category={category} index={index}  />
      ))}
      <AddCategoryForm  />
    </div>
  );
};

export default EditCategoriesForm;
