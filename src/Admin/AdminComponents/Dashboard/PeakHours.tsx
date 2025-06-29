import { Icon } from '@iconify/react/dist/iconify.js'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts'

const PeakHours = ({data}:{data:any}) => {
    const formatHourlyData = () => {
        if (!data?.doc?.hourlyDistribution) return [];
        
        return data.doc.hourlyDistribution.map((item:any) => ({
          hour: `${item.hour}:00`,
          orders: item.orders
        }));
      };
  return (
     <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-6">Peak Hours</h2>
              <div className="space-y-4">
                {data?.doc?.peakHours?.map((hour:any, index:number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${peakHourColors[index].bg}`}>
                        <Icon 
                          icon="mdi:clock-time-four" 
                          className={`text-xl ${peakHourColors[index].text}`} 
                        />
                      </div>
                      <span className="ml-3 text-gray-700">{hour.formattedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-900">{hour.orders}</span>
                      <span className="ml-2 text-gray-500">orders</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Hourly Distribution Chart */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">24-Hour Order Distribution</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formatHourlyData()}>
                      <XAxis 
                        dataKey="hour" 
                        tickFormatter={(value) => value.split(':')[0]} 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide={true} />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#339AF0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
  )
}

export default PeakHours


const peakHourColors = [
    {
      bg: "bg-blue-100",
      text: "text-blue-500"
    },
    {
      bg: "bg-purple-100",
      text: "text-purple-500"
    },
    {
      bg: "bg-amber-100",
      text: "text-amber-500"
    }
  ];