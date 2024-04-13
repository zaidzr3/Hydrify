import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { TbBottle } from "react-icons/tb";
import { BsArrowThroughHeartFill } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiMoney, BiStar } from "react-icons/bi";

const MyBeverages = () => {
  const { data: beverageData } = useQuery(
    "fetchMyBeverages",
    apiClient.fetchMyBeverages,
    {
      onError: () => {},
    }
  );

  if (!beverageData) {
    return <span>No Beverages found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Beverages</h1>
        <Link
          to="/add-beverage"
          className="text-sm text-gray-200 bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 ease-in-out"
        >
          Add Beverage
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {beverageData.map((beverage) => (
          <div
            data-testid="beverage-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{beverage.name}</h2>
            <div className="whitespace-pre-line">{beverage.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <TbBottle className="mr-1" />
                {beverage.name},{beverage.seller}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsArrowThroughHeartFill className="mr-1" />
                {beverage.flavor}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />£{beverage.price} per item
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <HiOutlineClipboardList className="mr-1" />
                {beverage.numberOfServings} Servings, {beverage.caloriesPerServing} Calories
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {beverage.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-beverage/${beverage._id}`}
                className="text-sm text-gray-200 bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 ease-in-out"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBeverages;