import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import OrderForm from "../forms/OrderForm/order";

const Detail = () => {
  const { beverageId } = useParams();

  const { data: beverage } = useQuery(
    "fetchBeverageById",
    () => apiClient.fetchBeverageById(beverageId || ""),
    {
      enabled: !!beverageId,
    }
  );

  if (!beverage) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: beverage.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{beverage.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {beverage.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={beverage.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {beverage.nutritionalFacts.map((NutritionalFact) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {NutritionalFact}
          </div>
        ))}
      </div>
         
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{beverage.description}</div>
        <div className="h-fit">
          <OrderForm
            price={beverage.price}
            beverageId={beverage._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;