import { useState, useMemo } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import SearchInput from "../../Components/UI/SearchInput"
import products from '../../Data/foodmenu.json'
import categories from '../../Data/Categories.json'
import DialogLayout from '../AdminComponents/DialogLayout'
import AddProductForm from '../AdminComponents/AddProductForm'
import DialogModal from '../AdminComponents/DialogModal'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filtering products based on selected category
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Category filtering
    if (selectedCategory) {
      filtered = filtered.filter(
        product => product.category === selectedCategory
      );
    }

    return filtered;
  }, [selectedCategory]);

  const [addProductFormOpen, setAddProductFormOpen]=useState(false)
  return (
    <div className="w-full relative">
      {/* {<DialogModal productName='Nothing'/>} */}
      {/* <div className={`fixed top-0 left-0 w-full h-screen backdrop-blur-sm z-[50] transition-all duration-200 delay-200 ${addProductFormOpen?'opacity-1 block':'opacity-0 hidden'}`}/> */}
      <DialogLayout title='Add Product' isOpen={addProductFormOpen} onClose={()=>setAddProductFormOpen(false)}>
        <AddProductForm onClose={()=>setAddProductFormOpen(false)} />
      </DialogLayout>
      <div className="auto w-full flex justify-between items-start">
        <SearchInput className="flex"/>

        <button onClick={()=>setAddProductFormOpen(true)} className="w-fit px-6 py-3 rounded-xl bg-primary-300 flex gap-x-1 text-[1rem] border border=primary-300" >
          <Icon icon='akar-icons:plus' className="text-2xl text-black"/>
          Add Product
        </button>
      </div>

      <div className="w-full h-auto productlist mt-7 rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4 flex justify-between">
          <h1 className="text-[1.5rem] font-semibold">
            All Products ({filteredProducts.length})
          </h1>

          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <table className="w-full border-collapse ">
          <thead className="bg-zinc-100 ">
            <tr>
              <th className="p-4 pl-2 text-left"></th>
              <th className="p-4 pl-2 text-left">Name</th>
              <th className="p-4 pl-2 text-left">Description</th>
              <th className="p-4 pl-2 text-left">Category</th>
              <th className="p-4 pl-2 text-left">Sizes & Prices</th>
              <th className="p-4 pl-2 text-left">Availability</th>
              <th className="p-4 pl-2 text-left">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product:any) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-2 ">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 ">{product.name}</td>
                <td className="p-2 ">{product.description}</td>
                <td className="p-2 ">{product.category}</td>
                <td className="p-2 ">
                  {product.sizes.map((size:any) => (
                    <div key={size.name}>
                      {size.name}: ${size.price}
                    </div>
                  ))}
                </td>
                <td className="p-2">
                  <span 
                    className={`px-2 py-1 rounded text-sm ${
                      product.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="p-2 border-b">
                  <div className="flex gap-2 justify-around">
                    <button 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => console.log(`Edit product ${product.id}`)}
                    >
                      <Icon icon="cuida:edit-outline" className="text-2xl" />
                    </button>
                    <button 
                    
                      className="text-red-600 hover:text-red-800"
                      onClick={() => console.log(`Delete product ${product.id}`)}
                    >
                      <Icon icon="fluent:delete-32-regular" className="text-2xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Menu
