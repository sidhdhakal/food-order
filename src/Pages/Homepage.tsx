import { Icon } from "@iconify/react";
import Categories from "../Data/Categories.json";
import SpeicalOffers from "../Data/SpeicalOffers.json";
import ProductCard from "../Components/UI/ProductCard";

const Homepage = () => {
  return (
    <div className="text-black rounded-[24px] flex-1 bg-zinc-50 overflow-hidden relative h-full">
      <div className="absolute inset-0 flex flex-col home gap-y-8 text-black p-4 overflow-y-auto">
        <div>
          <h1 className="text-[3rem] leading-[1]">Explore Categories</h1>
          <div className="flex flex-wrap gap-4 mt-4">
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
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;