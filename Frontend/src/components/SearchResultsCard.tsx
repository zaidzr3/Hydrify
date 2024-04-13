import { Link } from "react-router-dom";
import { BeverageType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
type Props = {
  beverage: BeverageType;
};

const SearchResultsCard = ({ beverage }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={beverage.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: beverage.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{beverage.flavor}</span>
          </div>
          <Link
            to={`/detail/${beverage._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {beverage.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{beverage.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {beverage.nutritionalFacts.slice(0, 3).map((nutritionalFact) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {nutritionalFact}
              </span>
            ))}
            <span className="text-sm">
              {beverage.nutritionalFacts.length > 3 &&
                `+${beverage.nutritionalFacts.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">${beverage.price} per Item</span>
            <Link
              to={`/detail/${beverage._id}`}
              className="bg-teal-600 text-white rounded-lg h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;