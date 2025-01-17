import { Icon } from "@iconify/react";
import Categories from "../Data/Categories.json";
import SpeicalOffers from "../Data/SpeicalOffers.json";
import ProductCard from "../Components/UI/ProductCard";
const Homepage = () => {
  return (
    <div className="flex flex-col home gap-y-8 overflow-y-auto text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
      <div>
        <h1 className="text-[3rem] leading-[1]">Explore Categories</h1>
        <div className="flex a flex-wrap gap-4 mt-4">
          {Categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-center items-center bg-zinc-200 p-2 aspect-square h-[7rem] rounded-2xl gap-y-2"
            >
              <Icon
                icon={category.icon}
                className="text-[3rem] text-primary-600"
              />
              <h1 className="text-md">{category.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-[3rem] leading-[1]">Today's Special</h1>
        <div className="grid grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
          {SpeicalOffers.map((item) => (
            <ProductCard item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
