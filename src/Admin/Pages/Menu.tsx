import { useState, useMemo } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js"
import SearchInput from "../../Components/UI/SearchInput"
import products from '../../Data/foodmenu.json'
import categories from '../../Data/Categories.json'
import DialogLayout from '../AdminComponents/DialogLayout'
import AddProductForm from '../AdminComponents/AddProductForm'
import DialogModal from '../../Components/DialogModal'
import EditProductForm from '../AdminComponents/EditProductForm'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const [searchValue, setSearchValue] = useState('')

  const [isDialogOpen, setIsDialogOpen] = useState({
    addProductForm: false,
    DeleteDialog: false
  })

  const [editProductForm, setEditProductForm]=useState<{status:boolean, id:any}>({
    status:false,
    id:undefined
  })

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = !searchValue ||
        product.name.toLowerCase().includes(searchValue.toLowerCase());

      const matchesCategory = !selectedCategory ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, searchValue, products]);


  return (
    <div className="w-full relative">
      <DialogLayout
        title='Add Product'
        isOpen={isDialogOpen.addProductForm}
        onClose={() => setIsDialogOpen((prevState) => ({
          ...prevState, 
          addProductForm: false,
        }))}
      >
        <AddProductForm onClose={() => setIsDialogOpen((prevState) => ({
          ...prevState, 
          addProductForm: false,
        }))} />
      </DialogLayout>


      <DialogLayout
        title='Edit Product'
        isOpen={editProductForm.status}
        onClose={() => setEditProductForm(() => ({
          id:null,
          status:false,

        }))}
      >
        <EditProductForm onClose={() => setEditProductForm(() => ({
          id:null,
          status: false,
        }))} product={editProductForm.id} />
      </DialogLayout>

      {isDialogOpen.DeleteDialog &&
        <DialogModal
        message={`Do you really want to delete the product ${'Nothing'}?`}
        btntext='Delete'
        onConfirm={() => console.log('Confirm')} onCancel={() => setIsDialogOpen((prevState) => ({
          ...prevState, 
          DeleteDialog: false, 
        }))} />
      }

      <div className="auto w-full flex justify-between items-start">
        <SearchInput
          className="flex"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />

        <button
          onClick={() => setIsDialogOpen((prevState) => ({
            ...prevState, 
            addProductForm: true, 
          }))}
          className="w-fit px-6 py-3 rounded-xl bg-primary-300 flex gap-x-1 text-[1rem] border border=primary-300"
        >
          <Icon icon='akar-icons:plus' className="text-2xl text-black" />
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
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-2 ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 min-w-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 ">{product.name}</td>
                <td className="p-2 ">{product.description}</td>
                <td className="p-2 ">{product.category}</td>
                <td className="p-2 ">
                  {product.sizes.map((size) => (
                    <div key={size.name}>
                      {size.name}: ${size.price}
                    </div>
                  ))}
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${product.available
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
                      onClick={() => setEditProductForm(() => ({
                        id:product,
                        status: true, 
                      }))}

                    >
                      <Icon icon="cuida:edit-outline" className="text-2xl" />
                    </button>
                    <button

                      className="text-red-600 hover:text-red-800"
                      onClick={() => setIsDialogOpen((prevState) => ({
                        ...prevState, 
                        DeleteDialog: true, 
                      }))}
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