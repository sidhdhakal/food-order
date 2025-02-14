import { useGetAllFeedbacks } from "../../Queries/feedback/useGetAllFeedbacks";
import SearchInput from "../../Components/UI/SearchInput";
import { useMemo, useState } from "react";
import FeedbackCard from "../AdminComponents/FeedbackCard";
import Loading from "../../Components/UI/Loading";
import IsError from "../../Components/UI/IsError";

const Feedbacks = () => {
  const { data, isLoading, isError } = useGetAllFeedbacks();
  const [searchValue, setSearchValue] = useState("");

  const filteredFeedbacks = useMemo(() => {
    if (!data?.doc) return [];

    return data.doc.filter(
      (feedback: any) =>
        !searchValue ||
        feedback.user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        feedback.user.email.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data?.doc]);

  if (isLoading) return <Loading>Getting Feedbacks...</Loading>;

  if (isError) return <IsError>Failed to get Feedbacks</IsError>;

  return (
    <div className="w-full relative">
      <div className="auto w-full flex justify-between items-start">
        <SearchInput
          className="flex"
          placeholder="Search Feedback "
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>
      <div className="w-full mt-7 h-auto productlist rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4">
          <h1 className="text-[1.5rem] font-semibold">Customer Feedbacks ({filteredFeedbacks?.length})</h1>
        </div>

        <div className=" grid grid-cols-2 gap-8">
          {filteredFeedbacks?.map((feedback: any) => (
            <FeedbackCard feedback={feedback}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
