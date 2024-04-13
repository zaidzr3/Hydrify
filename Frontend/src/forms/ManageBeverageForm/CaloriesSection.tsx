import { useFormContext } from "react-hook-form";
import { BeverageFormData } from "./ManageBeverageForm";

const CaloriesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BeverageFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Calories</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Number of Servings
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register("numberOfServings", {
              required: "This field is required",
            })}
          />
          {errors.numberOfServings?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.numberOfServings?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Calories Per Serving
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={0}
            {...register("caloriesPerServing", {
              required: "This field is required",
            })}
          />
          {errors.caloriesPerServing?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.caloriesPerServing?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default CaloriesSection;