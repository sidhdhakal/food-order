import { Icon } from "@iconify/react/dist/iconify.js";

const CategoryCard = ({category, selectedCategory, setSelectedCategory}:any) => {
  return (
    <div
      onClick={() => setSelectedCategory(category.name)}
      key={category.id}
      className={`flex flex-col justify-center items-center p-2 aspect-square h-[7rem] cursor-pointer rounded-2xl gap-y-2 border ${
        selectedCategory === category.name
          ? "border-primary-500 bg-primary-100/50"
          : "border-transparent bg-white "
      }`}
    >
      <Icon icon={category.icon} className="text-[3rem] text-primary-600" />
      <h1 className="text-md">{category.name}</h1>
    </div>
  );
};

export default CategoryCard;
