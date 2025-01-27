import { Icon } from "@iconify/react/dist/iconify.js";
import DialogModal from "../DialogModal";
import { useState } from "react";

const UserDetailDiv = ({ user }: any) => {
  const logOut = () => {
    document.cookie = `user=''; path=/; expires=${new Date(
      Date.now() - 1000
    ).toUTCString()}`;
    window.location.reload();
  };

  const [deleteDialogModal, setDeleteDialogModal]=useState(false)
  return (
    <div className=" w-full  flex flex-col gap-y-2 justify-between items-center  aspect-square self-center rounded-[24px]">
      { deleteDialogModal && <DialogModal message="Do you really want to Logout?" btntext="Logout" onCancel={()=>setDeleteDialogModal(false)} onConfirm={()=>{logOut(); setDeleteDialogModal(false)}}/>}
      <div className="flex flex-col justify-center items-center p-2">
        <img
          src={
            user?.picture ||
            "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
          }
          alt=""
          className="w-[4rem] object-cover rounded-[24px] aspect-square"
        />
        <h1 className="text-md leading-[1] 4xl:text-xl font-semibold mt-2 text-center">
          {user.name}
        </h1>
        <h3 className="text-zinc-600 hidden 4xl:flex 4xl:text-lg ">
          {user.email}
        </h3>
      </div>
      <button
        onClick={()=>setDeleteDialogModal(true)}
        className="py-2 4xl:py-3 text-center bg-red-500 hover:bg-red-600 w-full rounded-[20px] gap-x-2 text-white flex flex-col 4xl:flex-row justify-center items-center text-md"
      >
        <Icon
          icon="solar:logout-2-bold-duotone"
          className="text-[1.4rem] 4xl:text-[1.6rem]"
        />
        Log out
      </button>
    </div>
  );
};

export default UserDetailDiv;
