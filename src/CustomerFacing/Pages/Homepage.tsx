import IsError from "../../Components/UI/IsError";
import Loading from "../../Components/UI/Loading";
import ProductCard from "../../Components/UI/ProductCard";
import Title from "../../Components/UI/Title";
import { useGetFoods } from "../../Queries/food/useGetFoods";

const Homepage = ({setIsActiveComponent}:any) => {
  const { data, isLoading, isError } = useGetFoods();


  return (
      <div className="flex flex-col home gap-y-8 bg-zinc-100 flex-1 min-h-[calc(100vh-5rem)] overflow-y-auto text-black p-4">
        <div className="w-full md:h-[50vh]">
          <img 
            onClick={()=>setIsActiveComponent('Menu')} 
            src="/banner.png" 
            alt="" 
            className="w-full object-cover h-full object-top cursor-pointer rounded-[16px]" 
          />
        </div>

        <div>
          <Title>Today's Special</Title>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
            {isLoading && <Loading>Loading...</Loading>}
            {isError && <IsError>Cannot get Todays Special</IsError>}
            {!isLoading && !isError && data?.doc && (
              <>
                {data?.doc?.slice(5,8,3).map((item:any) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>

        <div>
          <Title>Based on Your Recents</Title>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
          {isLoading && <Loading>Loading...</Loading>}
            {isError && <IsError>Cannot get foods</IsError>}
            {!isLoading && !isError && (
              <>
                {data?.doc?.slice(4,10).map((item:any) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>

        <div className="bg-transparent h-[2rem] md:hidden"/>
      </div>
  );
};

export default Homepage;