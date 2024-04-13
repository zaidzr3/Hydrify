import { useFormContext } from "react-hook-form";
import { beverageFlavors} from "../../config/beverage-options-config";
import { BeverageFormData } from "./ManageBeverageForm";

const FlavorSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BeverageFormData>();

  const flavorWatch = watch("flavor");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Flavor</h2>
      <div className="grid grid-cols-5 gap-2">
        {beverageFlavors.map((flavor) => (
          <label
            className={
              flavorWatch === flavor
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={flavor}
              {...register("flavor", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{flavor}</span>
          </label>
        ))}
      </div>
      {errors.flavor && (
        <span className="text-red-500 text-sm font-bold">
          {errors.flavor.message}
        </span>
      )}
    </div>
  );
};

export default FlavorSection;