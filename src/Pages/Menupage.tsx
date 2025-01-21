import { Icon } from "@iconify/react/dist/iconify.js";
import Categories from "../Data/Categories.json";
import SpecialOffers from "../Data/SpeicalOffers.json";
import ProductCard from "../Components/UI/ProductCard";
import { useState } from "react";
import CategoryCard from "../Components/UI/CategoryCard";

const Menupage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('bestMatch');

  const sortOptions = [
    { value: 'bestMatch', label: 'Best Match', icon: 'ph:star' },
    { value: 'priceLowHigh', label: 'Price: Low to High', icon: 'ph:arrow-up' },
    { value: 'priceHighLow', label: 'Price: High to Low', icon: 'ph:arrow-down' },
    { value: 'ratingHighLow', label: 'Rating: High to Low', icon: 'ph:star-fill' },
    { value: 'ratingLowHigh', label: 'Rating: Low to High', icon: 'ph:star-half' },
  ];

  const getSortedOffers = () => {
    let filteredOffers = selectedCategory === '' 
      ? SpecialOffers 
      : SpecialOffers.filter((offer) => offer.category === selectedCategory);

    switch (sortOption) {
      case 'priceLowHigh':
        return [...filteredOffers].sort((a, b) => a.sizes[0].price - b.sizes[0].price);
      case 'priceHighLow':
        return [...filteredOffers].sort((a, b) => b.sizes[0].price - a.sizes[0].price);
      case 'ratingHighLow':
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      case 'ratingLowHigh':
        return [...filteredOffers].sort((a, b) => a.rating - b.rating);
      default:
        return filteredOffers; // Best Match - default order
    }
  };

  return (
    <div className="flex flex-col home gap-y-8 overflow-y-auto text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
      <div>
        <h1 className="text-[3rem] leading-[1]">Explore Categories</h1>
        <div className="flex flex-wrap gap-4 mt-4">
          <div
            onClick={() => setSelectedCategory('')}
            className={`flex flex-col justify-center items-center p-2 aspect-square h-[7rem] rounded-2xl gap-y-2 border ${
              selectedCategory === '' ? 'border-primary-500 bg-primary-100/50' : 'border-transparent bg-zinc-100'
            }`}
          >
            <Icon
              icon="icon-park-twotone:overall-reduction"
              className="text-[3rem] text-primary-600"
            />
            <h1 className="text-md">All Products</h1>
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

      <div className="w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-[3rem] leading-[1]">Menu</h1>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
            <Icon icon="solar:sort-line-duotone" className="text-gray-500 text-2xl" />
            <select 
              className="bg-transparent border-none outline-none text-gray-600 pr-8"
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
        <div className="grid grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
          {getSortedOffers().map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menupage;