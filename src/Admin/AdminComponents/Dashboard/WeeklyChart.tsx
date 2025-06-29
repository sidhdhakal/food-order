import { ResponsiveContainer, LineChart, XAxis, Tooltip, Line } from 'recharts'

const WeeklyChart = ({data}:{data:any}) => {
  return (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-semibold text-gray-900">Weekly Order Trend</h2>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data?.doc?.chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#339AF0"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#339AF0" }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
  )
}

export default WeeklyChart