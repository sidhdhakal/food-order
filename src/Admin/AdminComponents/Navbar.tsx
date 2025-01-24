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

// export const UserDetail = ({ navigate }: any) => {
//     const { data: user } = useQuery({
//         queryKey: ["User"],
//         queryFn: CheckLogin,
//     });


//     const logOut = () => {
//         document.cookie = `user=''; path=/; expires=${new Date(
//             Date.now() - 1000
//         ).toUTCString()}`;
//         window.location.reload();
//     };
//     console.log(user)
//     const [isOpen, setIsOpen] = useState(false);

//     // if(!user)
//     //         return navigate('/admin/login')

//     return (
//         <div className="">
//             {user &&
//                 <div className="relative">
//                     <img
//                         onClick={() => setIsOpen(!isOpen)}
//                         src={
//                             user?.picture ||
//                             "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
//                         }
//                         alt=""
//                         className="w-[3rem] object-cover rounded-[24px] aspect-square"
//                     />
//                     {isOpen && (
//                         <div className="absolute top-[120%] right-0 h-fit w-fit bg-white shadow-md rounded-xl p-3">
//                             <h1 className="text-md leading-[1] 4xl:text-xl font-semibold  text-center">
//                                 {user.name}
//                             </h1>
//                             <h3 className="text-zinc-600  4xl:flex 4xl:text-lg ">
//                                 {user.email}
//                             </h3>

//                             <button
//                                 onClick={logOut}
//                                 className="py-2 4xl:py-3 text-center bg-red-500 hover:bg-red-600 mt-2 w-full rounded-xl gap-x-2 text-white flex flex-row justify-center items-center text-md"
//                             >
//                                 <Icon
//                                     icon="solar:logout-2-bold-duotone"
//                                     className="text-[1.4rem] 4xl:text-[1.6rem]"
//                                 />
//                                 Log out
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             }
//         </div>
//     );
// };
