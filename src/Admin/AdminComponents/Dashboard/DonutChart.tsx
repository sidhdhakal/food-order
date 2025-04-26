import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const DonutChart = ({data}:{data:any}) => {
  return (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-semibold text-gray-900">Sales by Category</h2>
                </div>
              </div>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.doc?.categorySales}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {data?.doc?.categorySales.map((_:any, index:number) => (
                        <Cell key={`cell-${index}`} fill={categoryColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="text-3xl font-bold text-gray-900">100%</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {data?.doc?.categorySales.map((entry:any, index:number) => (
                  <div key={`legend-${index}`} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: categoryColors[index] }}
                    />
                    <span className="text-sm text-gray-600">{entry.name}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default DonutChart
const categoryColors = [
    "#FF6B6B",
    "#845EF7",
    "#FFA500",
    "#354AF0",
    "#ff9AF0",
    "#A8E6A3"
  ];