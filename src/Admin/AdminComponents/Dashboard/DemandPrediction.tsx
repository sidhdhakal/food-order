import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// Updated type definitions to match the new API response
interface PredictionItem {
  itemId: string;
  itemName: string;
  itemCategory: string;
  predicted_quantity: number;
  confidence: string;
  data_points: number;
  insight: string;
}

interface PredictionResponse {
  predictions: PredictionItem[];
  prediction_date: string;
  items_analyzed: number;
  orders_analyzed: number;
}

// Category color mapping function
const getCategoryColor = (category: string) => {
  const colors = {
    "Beverages": { bg: "bg-blue-100", text: "text-blue-800" },
    "Healthy Options": { bg: "bg-green-100", text: "text-green-800" },
    "Fast Food": { bg: "bg-orange-100", text: "text-orange-800" },
    "Main Course": { bg: "bg-purple-100", text: "text-purple-800" },
    "Desserts": { bg: "bg-pink-100", text: "text-pink-800" },
    "Snacks": { bg: "bg-yellow-100", text: "text-yellow-800" }
  };
  
  return colors[category as keyof typeof colors] || { bg: "bg-gray-100", text: "text-gray-800" };
};

const DemandPrediction = () => {
  const [sortBy, setSortBy] = useState<"category" | "demand">("demand");
  
  // Fetch demand prediction data using Tanstack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["demandPrediction"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_PREDICTION_URL}/predict`);
      return response.data as PredictionResponse;
    }
  });
  
  // Sort the data based on user selection
  const sortedData = data?.predictions ? [...data.predictions].sort((a, b) => {
    if (sortBy === "demand") {
      return b.predicted_quantity - a.predicted_quantity;
    } else {
      return a.itemCategory.localeCompare(b.itemCategory);
    }
  }) : [];
  
  // Group data by category for better visualization
  const groupedByCategory = sortedData.reduce((acc, item) => {
    acc[item.itemCategory] = acc[item.itemCategory] || [];
    acc[item.itemCategory].push(item);
    return acc;
  }, {} as Record<string, PredictionItem[]>);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="text-lg font-semibold text-gray-500">Loading prediction data...</span>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="text-lg font-semibold text-red-600">Error loading prediction data. Please try again later.</span>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Today's Demand Forecast</h2>
          {data && (
            <p className="text-sm text-gray-500 mt-1">
              {data.orders_analyzed} orders • {data.items_analyzed} items analyzed
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">AI Predicted</div>
          <select 
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "category" | "demand")}>
            <option value="demand">Sort by Demand</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>
      
      {sortedData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No prediction data available</div>
      ) : (
        <div className="space-y-4">
          {sortBy === "category" ? (
            Object.entries(groupedByCategory).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <div className="text-lg font-medium text-gray-700">{category}</div>
                {items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-md font-semibold text-gray-800">{item.itemName}</span>
                      <span className="text-sm text-gray-500 mt-1">Confidence: <span className={getConfidenceClass(item.confidence)}>{item.confidence}</span> • {item.data_points} data points</span>
                      {item.insight && <span className="text-sm italic text-gray-600 mt-2">{item.insight}</span>}
                    </div>
                    <DemandIndicator quantity={item.predicted_quantity} />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="space-y-3">
              {sortedData.slice(0,5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(item.itemCategory).bg} ${getCategoryColor(item.itemCategory).text}`}>
                        {item.itemCategory}
                      </div>
                      <span className="text-md font-semibold text-gray-800">{item.itemName}</span>
                    </div>
                    <span className="text-sm text-gray-500 mt-1 ml-1">Confidence: <span className={getConfidenceClass(item.confidence)}>{item.confidence}</span> • {item.data_points} data points</span>
                    {item.insight && <span className="text-sm italic text-gray-600 mt-1 ml-1">{item.insight}</span>}
                  </div>
                  <DemandIndicator quantity={item.predicted_quantity} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Forecast for: {data?.prediction_date || new Date().toLocaleDateString()}</span>
          <span>Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine confidence class
const getConfidenceClass = (confidence: string) => {
  if (confidence=='low') {
    return 'text-red-600'; // Low confidence
  } else if (confidence=='medium') {
    return 'text-yellow-600'; // Medium confidence
  }
  return 'text-green-600'; // High confidence
};

// Updated helper component for visual demand indicator
const DemandIndicator = ({ quantity }: { quantity: number }) => {
  let color = "bg-gray-100";
  let textColor = "text-gray-700";
  let description = "Low";
  
  if (quantity >= 25) {
    color = "bg-red-100";
    textColor = "text-red-700";
    description = "High";
  } else if (quantity >= 10) {
    color = "bg-yellow-100";
    textColor = "text-yellow-700";
    description = "Medium";
  }
  
  const displayQuantity = Math.round(quantity * 10) / 10;
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-lg font-semibold">{displayQuantity}</span>
      <div className={`px-3 py-1 rounded-full text-xs ${color} ${textColor}`}>
        {description} Demand
      </div>
    </div>
  );
};

export default DemandPrediction;
