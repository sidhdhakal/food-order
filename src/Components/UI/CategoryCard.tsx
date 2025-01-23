
const CategoryCard = ({category, selectedCategory, setSelectedCategory}:any) => {
  return (
    <div
      onClick={() => setSelectedCategory(category.name)}
      key={category.id}
      className={`flex flex-row md:flex-col gap-x-1 px-3 shadow-sm justify-center items-center  p-2 md:aspect-square h-auto md:h-[7rem] rounded-2xl gap-y-2 border ${
        selectedCategory === category.name
          ? "border-primary-500 bg-primary-100/50"
          : "border-transparent bg-white "
      }`}
    >
      {/* <Icon icon={category.icon} className="text-3xl lg:text-[2.6rem] 4xl:text-[3rem] text-primary-600" /> */}
      <img src={category.icon} className="w-[1.6rem] mr-1 md:w-[2rem] lg:w-[2.8rem]"/>
      <h1 className="text-md text-center">{category.name}</h1>
    </div>
  );
};

export default CategoryCard;
