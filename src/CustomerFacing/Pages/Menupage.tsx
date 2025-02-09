import { Icon } from "@iconify/react/dist/iconify.js";
import Categories from "../../Data/Categories.json";
import MenuData from "../../Data/foodmenu.json";
import ProductCard from "../../Components/UI/ProductCard";
import { useState } from "react";
import CategoryCard from "../../Components/UI/CategoryCard";
import sortOptions from '../../Data/SortOptions.json'
import SearchInput from "../../Components/UI/SearchInput";
import Title from "../../Components/UI/Title";

const Menupage = ({searchValue, setSearchValue}:any) => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOption, setSortOption] = useState("bestMatch");

  // Helper function to handle filtering and sorting
  const getFilteredOffers = () => {
    let filteredOffers =
      selectedCategory === "All Products"
        ? MenuData
        : MenuData.filter((offer) => offer.category === selectedCategory);

    // Apply search filter
    if (searchValue) {
      filteredOffers = filteredOffers.filter((offer) =>
        offer.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return filteredOffers;
  };

  const getSortedOffers = () => {
    const filteredOffers = getFilteredOffers(); // Get filtered offers based on the search term

    switch (sortOption) {
      case "priceLowHigh":
        return [...filteredOffers].sort(
          (a, b) => a.sizes[0].price - b.sizes[0].price
        );
      case "priceHighLow":
        return [...filteredOffers].sort(
          (a, b) => b.sizes[0].price - a.sizes[0].price
        );
      case "ratingHighLow":
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      case "ratingLowHigh":
        return [...filteredOffers].sort((a, b) => a.rating - b.rating);
      default:
        return filteredOffers; // Best Match - default order
    }
  };

  return (
    <div className="flex flex-col home gap-y-8 min-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-transparent overflow-hidden">
      <div className="">
        <Title className='text-3xl' >Explore Categories</Title>
        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 mt-4">
          <div
            onClick={() => setSelectedCategory('All Products')}
            className={`flex flex-row md:flex-col gap-x-1 px-3 shadow-sm justify-center items-center  p-2 md:aspect-square h-auto md:h-[7rem] rounded-2xl gap-y-2 border ${
              selectedCategory === 'All Products'
                ? "border-primary-500 bg-primary-100/50"
                : "border-transparent bg-white "
            }`}
          >
            <img src='/Icons/diet.png' className="w-[1.6rem] mr-1 md:w-[2rem] lg:w-[2.8rem]"/>
            <h1 className="text-md">{'All Products'}</h1>
          </div>
          {Categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </div>
      </div>
      <SearchInput
        className="flex md:hidden w-full"
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
      />

      <div className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-xl lg:text-3xl font-semibold">
            {selectedCategory || 'All'} ({getSortedOffers().length})
          </h2>
          <div className="flex items-center gap-2 bg-white px-2 md:px-3 py-2 rounded-xl shadow-sm">
            <Icon
              icon="solar:sort-line-duotone"
              className="text-gray-500 text-2xl"
            />
            <select
              className="bg-transparent border-none outline-none text-gray-600"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
          {getSortedOffers().map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="bg-transparent h-[2rem] md:hidden"/>
    </div>
  );
};

export default Menupage;
