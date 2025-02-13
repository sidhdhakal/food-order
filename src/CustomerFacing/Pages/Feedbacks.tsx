import { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import categories from '../../Data/FeedbackCategory.json'
import FeedbackCard from '../../Components/Feedbackpage/FeedbackCard';
import CategoryCard from '../../Components/UI/CategoryCard';
import Title from '../../Components/UI/Title';
import { useGetMyFeedbacks } from '../../Queries/feedback/useGetMyFeedbacks';
import Loading from '../../Components/UI/Loading';
import IsError from '../../Components/UI/IsError';
const Feedbacks = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Feedbacks');
  
  const{data:userFeedbacks, isLoading, isError}=useGetMyFeedbacks()
  const filteredFeedbacks = selectedCategory === '' || selectedCategory === 'All Feedbacks'
    ? userFeedbacks?.doc
    : userFeedbacks?.doc?.filter((feedback:any) => feedback.category === selectedCategory);



  return (
    <div className="flex flex-col home min-h-[calc(100vh-5rem)] gap-y-8 overflow-y-auto text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-transparent ">
      <div>
        <Title className="text-3xl">Feedback</Title>
        <p className="text-gray-500">View and manage customer feedback</p>
        
        <div className="flex flex-wrap  gap-2 md:gap-3 lg:gap-4 mt-6">
          <div
      onClick={() => setSelectedCategory('All Feedbacks')}
      className={`flex flex-row md:flex-col gap-x-1 px-3 shadow-sm justify-center items-center  p-2 md:aspect-square h-auto md:h-[7rem] rounded-2xl gap-y-2 border ${
        selectedCategory === 'All Feedbacks'
          ? "border-primary-500 bg-primary-100/50"
          : "border-transparent bg-white "
      }`}
    >
      {/* <Icon icon="icon-park-twotone:all-application" className="text-3xl lg:text-[2.6rem] 4xl:text-[3rem] text-primary-600" /> */}
      <img src='/Icons/feedbacks.png' className="w-[1.6rem] mr-1 md:w-[2rem] lg:w-[2.8rem]"/>

      <h1 className="text-md text-center">All Feedbacks</h1>
    </div>
  
          {categories.slice(1).map((category) => (
            <CategoryCard key={category.id} category={category} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl lg:text-3xl font-semibold">{selectedCategory || 'All'} Reviews ({filteredFeedbacks?.length})</h2>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
            <Icon icon="icon-park-twotone:filter" className="text-gray-500 text-2xl" />

            <select  className="bg-transparent border-none outline-none text-gray-600 pr-8">
              <option>Most Recent</option>
              <option>Highest Rated</option>
              <option>Lowest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
        {isLoading &&
          <Loading>Loading...</Loading>
        }
        {isError &&
          <IsError>Cannot get Feedbacks</IsError>
        }
        {!isLoading && !isError &&
        <>
          {filteredFeedbacks?.map((feedback:any) => (
            <FeedbackCard key={feedback._id} feedback={feedback} />
          ))}
          </>}
        </div>
      </div>
      <div className="bg-transparent h-[2rem] md:hidden"/>

    </div>
  );
};

export default Feedbacks;
