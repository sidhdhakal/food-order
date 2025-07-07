// import { Icon } from "@iconify/react/dist/iconify.js";
// import { useState } from "react";
// import CheckLogin from "../../Utils/CheckLogin";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

const Navbar = ({activeComponent}:any) => {
    // const navigate = useNavigate();

    return (
        <div className="w-full h-[5rem] bg-white flex justify-between sticky top-0 px-10 items-center shadow-sm z-[100]">
                {/* <Logo /> */}
                <h1 className="font-semibold text-[1.5rem] uppercase">ADMIN / {activeComponent}</h1>
                {/* <UserDetail navigate={navigate} /> */}
        </div>
    )
}


export default Navbar
