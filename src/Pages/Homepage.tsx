import { Icon } from "@iconify/react/dist/iconify.js"


const Homepage = () => {
  return (
    <div className="flex text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
          <div>
            <h1 className="text-[3rem] leading-[1]">Explore Categories</h1>
            <div className="flex a gap-4 mt-4  ">
            {Categories.map((category)=>(
              <div className="flex flex-col justify-center items-center bg-zinc-200 p-2 aspect-square h-[7rem] rounded-2xl gap-y-2 ">
                <Icon icon={category.icon} className="text-[3rem] text-primary-600" />
                <h1 className="text-md">
                {category.name}
                </h1>
              </div>
            ))}
            </div>
          </div>
    </div>
  )
}

export default Homepage


const Categories=[
  {
    "id": 1,
    "name": "Snacks",
    "icon": "mdi-pot-mix"
  },
  {
    "id": 2,
    "name": "Beverages",
    "icon": "mdi-cup"
  },
  {
    "id": 3,
    "name": "Main Course",
    "icon": "mdi-food"
  },
  {
    "id": 4,
    "name": "Desserts",
    "icon": "mdi-cake"
  },
  {
    "id": 5,
    "name": "Healthy ",
    "icon": "mdi-leaf"
  },
  {
    "id": 6,
    "name": "Veg",
    "icon": "mdi-leaf"
  },
  {
    "id": 7,
    "name": "Non-Veg",
    "icon": "mdi-chicken-leg"
  }
]
