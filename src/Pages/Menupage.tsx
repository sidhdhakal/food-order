import { Icon } from "@iconify/react/dist/iconify.js";
import Categories from "../Data/Categories.json";
import SpecialOffers from "../Data/SpeicalOffers.json";
import ProductCard from "../Components/UI/ProductCard";
import { useState } from "react";
import CategoryCard from "../Components/UI/CategoryCard";
const Menupage = () => {
  const [selectedCategory, setSelectedCategory]=useState('')
  return (
    <div className="flex flex-col home gap-y-8 overflow-y-auto text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
      <div>
        <h1 className="text-[3rem] leading-[1]">Explore Categories</h1>
        <div className="flex a flex-wrap gap-4 mt-4">

        <div

onClick={()=>setSelectedCategory('')}
  className={`flex flex-col justify-center items-center p-2 aspect-square h-[7rem] rounded-2xl gap-y-2 border ${selectedCategory===''?'border-primary-500 bg-primary-100/50':'border-transparent bg-zinc-100 '}`}
>
  <Icon
    icon='icon-park-twotone:overall-reduction'
    className="text-[3rem] text-primary-600"
  />
  <h1 className="text-md">All Products</h1>
</div>
          {Categories.map((category) => (
            <CategoryCard key={category.id} category={category} selectedCategory={selectedCategory} setSelectedCategory={selectedCategory}/>
        
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-[3rem] leading-[1]">Menu</h1>
        <div className="grid grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
          {selectedCategory===''? SpecialOffers.map((item) => (
            <ProductCard item={item} />
          )):
          SpecialOffers.filter((offer)=>offer.category===selectedCategory).map((item) => (
            <ProductCard item={item} />
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default Menupage;
