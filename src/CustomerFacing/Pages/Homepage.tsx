import SpeicalOffers from "../../Data/SpeicalOffers.json";
import ProductCard from "../../Components/UI/ProductCard";
import Title from "../../Components/UI/Title";
// import SearchInput from "../../Components/UI/SearchInput";
const Homepage = ({setIsActiveComponent}:any) => {
  return (
      <div className=" flex flex-col home gap-y-8 bg-zinc-100  flex-1 min-h-[calc(100vh-5rem)] overflow-y-auto text-black p-4 ">
        <div className="w-full  md:h-[40vh]">
          <img onClick={()=>setIsActiveComponent('Menu')} src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/special-food-menu-design-template-600acda7ee50facbb26ff6e05e3936e7_screen.jpg?ts=1651218525" alt="" 
          className="w-full object-cover h-full object-center cursor-pointer  rounded-[16px] " />

        </div>

{/* <SearchInput
        className="flex md:hidden w-full"
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          {
            setSearchValue(e.target.value)
            if(activeComponent!=='Menu')
                setIsActiveComponent('Menu')
          }
          }
      />       */}

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