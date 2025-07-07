import { useState } from "react";
import Navbar from "../AdminComponents/Navbar"
import Sidebar from "../AdminComponents/Sidebar"
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Menu from "./Menu";
import Feedbacks from "./Feedbacks";
import Customers from "./Customers";

const AdminPage = () => {
  const [activeComponent, setIsActiveComponent] = useState("Dashboard");
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard  />;
      case "Orders":
        return <Orders />;
      case "Menu":
        return <Menu />;
      case "Feedback":
        return <Feedbacks />;
      case "Customers":
        return <Customers />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="w-full flex justify-between text-black">
        <Sidebar 
          activeComponent={activeComponent}
          setIsActiveComponent={setIsActiveComponent} 
        />
        <div className="w-full h-auto  flex-1 bg-zinc-100 justify-center items-center ">
        <Navbar activeComponent={activeComponent}/>    
        <div className="w-full p-6" >
            {renderActiveComponent()}
        </div>
        </div>
    </div>
  )
}

export default AdminPage