import { useState } from "react";
import Homepage from "./Homepage";
import Menupage from "./Menupage";
import Sidebar from "../../Components/Sidebar";
import Feedbacks from "./Feedbacks";
import Navbar from "../../Components/Navbar";
import RightSidebar from "../../Components/RightSidebar";
import OrdersPage from "./Orderspage";
import Notifications from "./Notifications";
import MobileSidebar from "../../Components/MobileSidebar";

const Page = () => {
  const [activeComponent, setIsActiveComponent] = useState("Home");
  const [sidebarOpen, setIsSidebarOpen]=useState(false)
  const [searchValue, setSearchValue] = useState("");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Homepage  setIsActiveComponent={setIsActiveComponent} />;
      case "Orders":
        return <OrdersPage />;
      case "Menu":
        return <Menupage searchValue={searchValue} setSearchValue={setSearchValue} />;
      case "Feedback":
        return <Feedbacks />;
      case "Notifications":
        return <Notifications />;
      default:
        return <Homepage />;
    }
  };
  return (
    
    <>
      <MobileSidebar
        setIsSidebarOpen={setIsSidebarOpen}
         activeComponent={activeComponent}
         setIsActiveComponent={setIsActiveComponent} 
        />
      <div className=" h-full w-full flex ">
        <div className=" w-[8rem] 4xl:w-[16rem] hidden md:block">
          <Sidebar
            activeComponent={activeComponent}
            setIsActiveComponent={setIsActiveComponent}
          />
        </div>
        <div className="flex-1 h-screen flex flex-col">
          <Navbar  searchValue={searchValue} setSearchValue={setSearchValue} activeComponent={activeComponent}  sidebarOpen={sidebarOpen} setIsActiveComponent={setIsActiveComponent}
         setIsSidebarOpen={setIsSidebarOpen}/>
          <div className="bg-zinc-100 w-full pt-[5rem] flex justify-between">
              {renderActiveComponent()}
              <div onClick={()=>setIsSidebarOpen(false)} className={`w-full h-full  animate-fadeIn fixed backdrop-blur-sm lg:hidden ${sidebarOpen?'flex':'hidden'}`}/>
            <RightSidebar  setIsActiveComponent={setIsActiveComponent}  sidebarOpen={sidebarOpen}  />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
