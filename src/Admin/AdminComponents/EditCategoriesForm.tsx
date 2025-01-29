import AddCategoryForm from "./AddCategoryForm";
import CategoryCard from "./UI/CategoryCard";
import { useGetCategory } from "../../Queries/category/useGetCategories";


const EditCategoriesForm = () => {
  const { data, isLoading, error, isError, refetch } = useGetCategory();
  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="space-y-4 mt-4 dialog relative">
      {data.doc.map((category: any, index: any) => (
        <CategoryCard key={index} category={category} index={index} refetch={refetch} />
      ))}
      <AddCategoryForm refetch={refetch} />
    </div>
  );
};

export default EditCategoriesForm;
