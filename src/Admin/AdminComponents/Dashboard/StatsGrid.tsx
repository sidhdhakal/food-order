import { Icon } from '@iconify/react/dist/iconify.js'

const StatsGrid = ({data}:{data:any}) => {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6 mb-8">
            {data?.doc?.stats.map((stat:any, index:number) => (
              <div key={index} className={`bg-white p-4 rounded-xl shadow-sm border-t-2 ${stats[index].borderColor}`}>
                <div className="flex items-start gap-4">
                  <div className={`${stats[index]?.bgColor} p-3 rounded-lg`}>
                    <Icon
                      icon={stats[index].icon}
                      className={`text-3xl 4xl:text-4xl ${stats[index].color}`}
                    />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-lg  ${stats[index].color}`}>
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {stat.title === "Total Revenue" && "Rs. "}
                          {stat.value}
                          {stat.title === "Avg Prep Time" && " min"}
                        </h3>
                      </span>
                    </div>
                    <p className="text-gray-500 text-md">{stat.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  )
}

export default StatsGrid

const stats = [
    {
      icon: "mdi:cart",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
      borderColor:"border-t border-emerald-500"
    },
    {
      icon: "mdi:package-variant", 
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      borderColor:"border-t border-purple-500"
  
    },
    {
      icon: "mdi:close-circle",
      color: "text-red-500",
      bgColor: "bg-red-100",
      borderColor:"border-t border-red-500"
  
    },
    {
      icon: "mdi:clock-outline", 
      color: "text-amber-500",  
      bgColor: "bg-amber-100",
      borderColor:"border-t border-amber-500"
  
    },
    {
      icon: "rivet-icons:money",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      borderColor:"border-t border-blue-500"
  
    },
    {
      icon: "mdi:timer",
      color: "text-teal-500",
      bgColor: "bg-teal-100",
      borderColor:"border-t border-emerald-500"
  
    },
  ];