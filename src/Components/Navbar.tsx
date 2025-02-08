import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import CheckLogin from "../Utils/CheckLogin";
import { useState } from "react";
import { useCart } from "../Utils/CartContext";
import Logo from "./UI/Logo";
import SearchInput from "./UI/SearchInput";
import { logOut } from "../Utils/logout";

const Navbar = ({ activeComponent, sidebarOpen, setIsSidebarOpen, setIsActiveComponent }: any) => {
  const { cart } = useCart(); // Get cart items from CartContext
  return (
    <div className=" min-h-[5rem] h-[5rem] w-full md:w-[calc(100vw-8rem)] 4xl:w-[calc(100vw-16rem)] fixed top-0 shadow-md bg-zinc-50/70 backdrop-blur-lg md:bg-zinc-50 flex justify-center items-center text-black z-[5]">
      <div className="w-full px-4 md:px-8 flex justify-between items-center">
        <div className="h-full hidden md:flex justify-center items-center gap-x-4">
          <Icon
            onClick={() => window.history.back()}
            icon="mynaui:arrow-long-left-solid"
            className="text-[3rem] px-3 rounded-2xl bg-zinc-200/70 hover:bg-zinc-300 cursor-pointer"
          />

          <p className="hidden md:block">{activeComponent} </p>
        </div>

        <div onClick={()=>setIsActiveComponent('Home')} className="md:hidden">
        <Logo />
        </div>

          <div className="flex justify-center items-center">

          <div
                onClick={() => setIsSidebarOpen(!sidebarOpen)}
           className="flex select-none justify-center items-center  lg:hidden">
            <div className="relative mr-4 cursor-pointer">
              <Icon
                icon="solar:cart-bold-duotone"
                className="text-[2.5rem] lg:hidden mr-2"
              />
              <span className="aspect-square rounded-full absolute top-0 right-0 bg-orange-500 text-white w-6 flex justify-center items-center">
                {Object.keys(cart).length}
              </span>
            </div>
            <UserDetail />
          </div>

          <SearchInput />
      
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const UserDetail = () => {
  const { data: user } = useQuery({
    queryKey: ["User"],
    queryFn: CheckLogin,
  });


  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      {user ? (
        <div className="relative">
          <img
            onClick={() => setIsOpen(!isOpen)}
            src={
              user?.picture ||
              "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            }
            alt=""
            className="w-[3rem] object-cover rounded-[24px] aspect-square"
          />
          {isOpen && (
            <div className="absolute top-[120%] right-0 h-fit w-fit bg-white shadow-md rounded-xl p-3">
              <h1 className="text-md leading-[1] 4xl:text-xl font-semibold  text-center">
                {user.name}
              </h1>
              <h3 className="text-zinc-600  4xl:flex 4xl:text-lg ">
                {user.email}
              </h3>

              <button
                onClick={logOut}
                className="py-2 4xl:py-3 text-center bg-red-500 hover:bg-red-600 mt-2 w-full rounded-xl gap-x-2 text-white flex flex-row justify-center items-center text-md"
              >
                <Icon
                  icon="solar:logout-2-bold-duotone"
                  className="text-[1.4rem] 4xl:text-[1.6rem]"
                />
                Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <a
          href="/login"
          onClick={logOut}
          className=" text-center w-full rounded-2xl gap-x-2 text-black bg-zinc-200 flex justify-center items-center px-3 py-2"
        >
          <Icon
            icon="solar:login-2-bold-duotone"
            className="text-[1.4rem] 4xl:text-[1.6rem]"
          />
          Log In
        </a>
      )}
    </div>
  );
};
