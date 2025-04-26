import { Icon } from "@iconify/react/dist/iconify.js";

const MostLovedFood = ({data}:{data:any}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
  <h2 className="font-semibold text-gray-900 mb-4">Most Popular Items</h2>
  
  {/* Header Row - Table-like structure */}
  <div className="grid grid-cols-5 gap-2 mb-2 px-4 py-2 bg-gray-100 rounded-lg">
    <div className="text-sm font-medium text-gray-600">Item</div>
    <div className="text-sm font-medium text-gray-600">Category</div>
    <div className="text-sm font-medium text-gray-600 text-right">Orders</div>
    <div className="text-sm font-medium text-gray-600 text-right">Quantity</div>
    <div className="text-sm font-medium text-gray-600 text-right">Revenue</div>
  </div>
  
  {/* Item Rows */}
  <div className="space-y-2">
    {data?.doc?.mostLovedFood?.map((item:any, index:number) => (
      <div 
        key={index} 
        className="grid grid-cols-5 gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {/* Item Name with Icon */}
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-full ${foodCategoryColors[index % foodCategoryColors.length].bg}`}>
            <Icon 
              icon="fluent:food-16-filled" 
              className={`text-lg ${foodCategoryColors[index % foodCategoryColors.length].text}`} 
            />
          </div>
          <span className="font-medium text-gray-900 truncate">{item.name}</span>
        </div>
        
        {/* Category */}
        <div className="text-sm text-gray-600 flex items-center">{item.category}</div>
        
        {/* Order Count */}
        <div className="text-right">
          <span className="font-semibold text-gray-900">{item.orderFrequency}</span>
        </div>
        
        {/* Quantity */}
        <div className="text-right">
          <span className="font-medium text-gray-900">{item.totalQuantity}</span>
          <span className="text-xs text-gray-500 ml-1">units</span>
        </div>
        
        {/* Revenue */}
        <div className="text-right">
          <span className="font-semibold text-emerald-600">
            Rs. {item.totalRevenue?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
    ))}
  </div>
  
  {/* Summary Row */}
  {data?.doc?.mostLovedFood?.length > 0 && (
    <div className="mt-4 flex justify-end">
      <div className="bg-gray-100 px-4 py-2 rounded-lg">
        <span className="text-sm font-medium text-gray-700">
          Total Revenue (Top Items): 
        </span>
        <span className="ml-2 font-semibold text-emerald-600">
          Rs. {data.doc.mostLovedFood.reduce((sum:number, item:any) => sum + (item.totalRevenue || 0), 0).toFixed(2)}
        </span>
      </div>
    </div>
  )}
</div>
  )
}

export default MostLovedFood

const foodCategoryColors = [
    {
      bg: "bg-emerald-100",
      text: "text-emerald-500"
    },
    {
      bg: "bg-purple-100",
      text: "text-purple-500"
    },
    {
      bg: "bg-amber-100",
      text: "text-amber-500"
    },
    {
      bg: "bg-blue-100",
      text: "text-blue-500"
    },
    {
      bg: "bg-pink-100",
      text: "text-pink-500"
    }
  ];