import { Icon } from "@iconify/react";
import SpeicalOffers from "../../Data/SpeicalOffers.json";
import ProductCard from "../../Components/UI/ProductCard";
import Title from "../../Components/UI/Title";
const Homepage = ({setIsActiveComponent}:any) => {
  return (
      <div className=" flex flex-col home gap-y-8 bg-zinc-100  flex-1 min-h-[calc(100vh-5rem)] overflow-y-auto text-black p-4 ">
        <div className="w-full  md:h-[40vh]">
          <img onClick={()=>setIsActiveComponent('Menu')} src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/special-food-menu-design-template-600acda7ee50facbb26ff6e05e3936e7_screen.jpg?ts=1651218525" alt="" 
          className="w-full object-cover h-full object-center cursor-pointer  rounded-[16px] " />

        </div>
        
        <div className='w-auto md:w-[25rem] relative flex md:hidden justify-center items-center'>
                    <input type='text' placeholder='Search Food' className=' px-3 md:px-6 py-3 w-full placeholder:text-zinc-600 bg-zinc-200/50 border border-zinc-300 rounded-2xl text-black active:outline-none focus:outline-none'/>
                    <button className='ml-2 bg-primary-300 hover:bg-primary-400 transition-all duration-200 px-4 md:px-6 rounded-2xl text-black py-2 h-full absolute right-0 flex justify-center items-center gap-x-1 '>
                        <Icon icon='flowbite:search-outline' className='text-[1.2rem] md:text-[1.5rem]' />
                        <span className="hidden md:block">
                        Search
                        </span>
                        </button>

                </div>
        {/* <div>
         <Title>Explore Categories</Title>
          <div className="flex flex-wrap gap-4 mt-4">
            {Categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-row md:flex-col gap-x-1 px-3 shadow-sm justify-center items-center bg-white p-2 md:aspect-square h-auto md:h-[7rem] rounded-2xl gap-y-2"
              >
                <Icon
                  icon={category.icon}
                  className="text-3xl lg:text-[2.6rem] 4xl:text-[3rem] text-primary-600"
                />
                <h1 className="text-md">{category.name}</h1>
              </div>
            ))}
          </div>
        </div> */}

        <div>
          <Title>Today's Special</Title>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
            {SpeicalOffers.slice(0,3).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>


        <div>
          <Title>Based on Your Recents</Title>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
            {SpeicalOffers.slice(4,8).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="bg-transparent h-[2rem] md:hidden"/>
      </div>
  );
};

export default Homepage;