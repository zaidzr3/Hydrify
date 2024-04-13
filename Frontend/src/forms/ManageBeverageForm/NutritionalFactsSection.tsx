import { useFormContext } from "react-hook-form";
import { beverageNutritionalFacts } from "../../config/beverage-options-config";
import { BeverageFormData } from "./ManageBeverageForm";

const NutritionalFactsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BeverageFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">NutritionalFacts</h2>
      <div className="grid grid-cols-5 gap-3">
        {beverageNutritionalFacts.map((nutritionalFact) => (
          <label className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={nutritionalFact}
              {...register("nutritionalFacts", {
                validate: (nutritionalFacts) => {
                  if (nutritionalFacts && nutritionalFacts.length > 0) {
                    return true;
                  } else {
                    return "At least one nutritionalFacts is required";
                  }
                },
              })}
            />
            {nutritionalFact}
          </label>
        ))}
      </div>
      {errors.nutritionalFacts && (
        <span className="text-red-500 text-sm font-bold">
          {errors.nutritionalFacts.message}
        </span>
      )}
    </div>
  );
};

export default NutritionalFactsSection;