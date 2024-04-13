import { useFormContext } from "react-hook-form";
import { BeverageFormData } from "./ManageBeverageForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BeverageFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Beverage</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Food Type
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("foodType", { required: "This field is required" })}
          ></input>
          {errors.foodType && (
            <span className="text-red-500">{errors.foodType.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Seller
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("seller", { required: "This field is required" })}
          ></input>
          {errors.seller && (
            <span className="text-red-500">{errors.seller.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Diet Type
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("dietType", { required: "This field is required" })}
          ></input>
          {errors.dietType && (
            <span className="text-red-500">{errors.dietType.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>

      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("price", { required: "This field is required" })}
        ></input>
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;