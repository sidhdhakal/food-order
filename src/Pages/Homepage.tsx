import { Icon } from '@iconify/react';
import { useCart } from '../Utils/CartContext';
import { useState } from 'react';

const Homepage = () => {
  const { cart, addToCart, decreaseQuantity } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string | null }>({});

  const handleSizeChange = (itemId: number, sizeName: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: sizeName, // Update selected size for the specific item
    }));
  };

  const handleAddToCart = (itemId: number, itemData: any) => {
    const selectedSize = selectedSizes[itemId];
    if (selectedSize) {
      const price = getPriceBySize(itemData, selectedSize);
      addToCart(itemId, itemData, selectedSize, price); // Add to cart with size and price
    }
  };

  const handleDecreaseQuantity = (itemId: number, _: any) => {
    const selectedSize = selectedSizes[itemId];
    if (selectedSize) {
      decreaseQuantity(itemId, selectedSize); // Decrease quantity with size
    }
  };

  const getPriceBySize = (item: any, sizeName: string) => {
    // This function returns the price based on the selected size name
    const size = item.sizes.find((size:any) => size.name === sizeName);
    return size ? size.price : 0;
  };

  return (
    <div className="flex flex-col home gap-y-8 overflow-y-auto text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
      <div>
        <h1 className="text-[3rem] leading-[1]">Explore Categories</h1>
        <div className="flex a flex-wrap gap-4 mt-4">
          {Categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-center items-center bg-zinc-200 p-2 aspect-square h-[7rem] rounded-2xl gap-y-2"
            >
              <Icon icon={category.icon} className="text-[3rem] text-primary-600" />
              <h1 className="text-md">{category.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-[3rem] leading-[1]">Today's Special</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {SpecialOffers.map((item) => {
            const defaultSize = item.sizes[0]?.name; // Get the default size (first size in the array)
            return (
              <div
                key={item.id}
                className="flex flex-col select-none justify-center items-center bg-zinc-200 p-2 w-full rounded-2xl gap-y-2"
              >
                <div className="flex gap-x-2 justify-center items-center">
                  <img
                    src={item.image}
                    alt=""
                    className="w-1/4 aspect-square object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h1 className="text-[1.2vw] font-semibold">{item.name}</h1>
                    <p className="text-[0.9vw] text-zinc-600">{item.description}</p>
                    <div className="flex gap-x-1 justify-start items-center">
                      <h1>Sizes:</h1>
                      <div className="flex gap-x-2">
                        {item.sizes.map((size) => (
                          <div
                            key={size.name}
                            onClick={() => handleSizeChange(item.id, size.name)}
                            className={`text-md px-2 py-1 rounded-full border border-transparent cursor-pointer ${
                              selectedSizes[item.id] === size.name ? 'bg-primary-500 text-white' : 'bg-zinc-300'
                            }`}
                          >
                            {size.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between w-full items-center">
                  <h1 className="text-[1.2vw] font-bold">
                    <span className="text-zinc-600 font-normal">Rs</span> {getPriceBySize(item, selectedSizes[item.id] || defaultSize)}
                  </h1>
                  <div className="w-[7rem] h-[2.5rem] flex justify-between items-center bg-zinc-100 rounded-full">
                    <span
                      onClick={() => handleDecreaseQuantity(item.id, item)}
                      className="h-full cursor-pointer aspect-square rounded-full bg-white flex justify-center items-center hover:bg-zinc-300"
                    >
                      <Icon icon="ic:round-minus" />
                    </span>
                    <h1>{cart[`${item.id}-${selectedSizes[item.id] || defaultSize}`]?.qty || 0}</h1>
                    <span
                      className="h-full cursor-pointer aspect-square rounded-full bg-primary-500 flex justify-center items-center hover:bg-primary-600"
                      onClick={() => handleAddToCart(item.id, item)}
                    >
                      <Icon icon="line-md:plus" className="text-white text-[1.3vw]" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

const SpecialOffers = [
  {
    id: 1,
    name: "Cheeseburger",
    description:
      "A delicious cheeseburger with a juicy beef patty, melted cheddar cheese, lettuce, tomato, and pickles.",
    image:
      "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
    sizes: [
      { name: 'Small', price: 8.99 },
      { name: 'Large', price: 12.99 },
    ],
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description:
      "A classic pizza topped with fresh mozzarella, basil, and a tangy tomato sauce.",
    image:
      "https://www.acouplecooks.com/wp-content/uploads/2022/10/Margherita-Pizza-093.jpg",
    sizes: [
      { name: 'Small', price: 12.99 },
      { name: 'Large', price: 16.99 },
    ],
  },
  {
    id: 3,
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5Yp0uPt-uqJ5udVjAL71-ArAIvCzE84nYQ&s",
    sizes: [
      { name: 'Small', price: 6.49 },
      { name: 'Large', price: 8.49 },
    ],
  },
  {
    id: 4,
    name: "Spaghetti Bolognese",
    description:
      "Traditional Italian spaghetti topped with a rich and savory beef bolognese sauce.",
    image:
      "https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204.jpg",
    sizes: [
      { name: 'Small', price: 14.49 },
      { name: 'Large', price: 18.49 },
    ],
  },
  {
    id: 5,
    name: "Chicken Tikka Masala",
    description:
      "A flavorful Indian dish with tender chicken cooked in a spiced tomato and cream sauce.",
    image:
      "https://www.recipetineats.com/tachyon/2018/04/Chicken-Tikka-Masala_0-SQ.jpg",
    sizes: [
      { name: 'Small', price: 11.99 },
      { name: 'Large', price: 15.99 },
    ],
  },
];

const Categories = [
  {
    id: 1,
    name: "Snacks",
    icon: "mdi-pot-mix",
  },
  {
    id: 2,
    name: "Beverages",
    icon: "mdi-cup",
  },
  {
    id: 3,
    name: "Main Course",
    icon: "mdi-food",
  },
  {
    id: 4,
    name: "Desserts",
    icon: "mdi-cake",
  },
  {
    id: 5,
    name: "Healthy",
    icon: "mdi-leaf",
  },
  {
    id: 6,
    name: "Veg",
    icon: "mdi-leaf",
  },
  {
    id: 7,
    name: "Non-Veg",
    icon: "mdi-chicken-leg",
  },
];
