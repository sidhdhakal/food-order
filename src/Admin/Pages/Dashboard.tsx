import { Icon } from "@iconify/react/dist/iconify.js"
import SearchInput from "../../Components/UI/SearchInput"

const Dashboard = () => {
  return (
    <div className="h-[200vh] w-full">
      <div className="auto w-full  flex justify-between items-start">
          <SearchInput className="flex"/>



          <button className="w-fit px-6 py-3 rounded-xl bg-primary-300 flex gap-x-1 text-[1rem] border border=primary-300" >
            <Icon icon='akar-icons:plus' className="text-2xl text-black"/>
            Add Product</button>
      </div>

      <div className="w-full h-auto productlist">
        
      </div>
    </div>
  )
}

export default Dashboard