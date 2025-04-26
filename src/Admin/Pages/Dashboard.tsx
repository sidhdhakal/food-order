import { useState } from "react";
import { Icon } from "@iconify/react";

import { DateRange } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useGetData } from "../../Queries/useGetData";
import Loading from "../../Components/UI/Loading";
import IsError from "../../Components/UI/IsError";
import Button from "../../Components/UI/Button";
import DemandPrediction from "../AdminComponents/Dashboard/DemandPrediction";
import StatsGrid from "../AdminComponents/Dashboard/StatsGrid";
import DonutChart from "../AdminComponents/Dashboard/DonutChart";
import WeeklyChart from "../AdminComponents/Dashboard/WeeklyChart";
import PeakHours from "../AdminComponents/Dashboard/PeakHours";
import MostLovedFood from "../AdminComponents/Dashboard/MostLovedFood";

const Dashboard = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { data, isLoading, isError, refetch } = useGetData(dateRange);
  const handleSelect = (ranges: any) => {
    setDateRange(ranges.selection);
  };

  if (isLoading) return <Loading>Getting Data...</Loading>;

  if (isError) return <IsError>Failed to get Data</IsError>;

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="relative w-fit flex gap-x-2">
          <button
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Icon icon="mdi:calendar" className="text-gray-500" />
            <span className="text-sm text-gray-600 text-nowrap">
              {format(dateRange.startDate, "MMM dd, yyyy")} -{" "}
              {format(dateRange.endDate, "MMM dd, yyyy")}
            </span>
          </button>

          {showDatePicker && (
            <div className="absolute right-0 top-10 mt-2 z-50">
              <div className="bg-white rounded-lg shadow-lg p-2">
                <DateRange
                  ranges={[dateRange]}
                  onChange={handleSelect}
                  months={1}
                  direction="vertical"
                  className="border rounded"
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <Button onClick={() => {refetch(); if(showDatePicker) setShowDatePicker(false)}}>Submit</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid data={data} />

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Details with Donut Chart */}
        <DonutChart data={data} />

        {/* Weekly Order Chart */}
        <WeeklyChart data={data} />
      </div>

      {/* Additional Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Peak Hours */}
        <PeakHours data={data} />

        {/* Most Loved Food */}
        <MostLovedFood data={data} />

        <div>
          <DemandPrediction />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
