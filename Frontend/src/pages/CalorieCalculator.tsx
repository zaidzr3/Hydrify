import { useForm } from "react-hook-form";

export type CalorieFormData = {
  units: 'US' | 'Metric';
  sex: 'Male' | 'Female' | 'Other';
  age: number;
  heightFeet: number;
  heightInches: number;
  weight: number;
  activityLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Very Active';
};

const CalorieCounter = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CalorieFormData>();
  const units = watch("units");

  const calculateBMR = (data: CalorieFormData) => {
    let heightInCm = (data.heightFeet * 30.48) + (data.heightInches * 2.54);
    let weightInKg = units === 'US' ? data.weight * 0.453592 : data.weight;
    let BMR;

    if (data.sex === 'Male') {
      BMR = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * data.age);
    } else if (data.sex === 'Female') {
      BMR = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * data.age);
    } else {
      // An average of the two formulas
      BMR = (88.362 + 447.593) / 2 + ((13.397 + 9.247) / 2 * weightInKg) + ((4.799 + 3.098) / 2 * heightInCm) - ((5.677 + 4.330) / 2 * data.age);
    }

    switch (data.activityLevel) {
      case 'Sedentary':
        return BMR * 1.2;
      case 'Light':
        return BMR * 1.375;
      case 'Moderate':
        return BMR * 1.55;
      case 'Active':
        return BMR * 1.725;
      case 'Very Active':
        return BMR * 1.9;
      default:
        return BMR;
    }
  };

  const onSubmit = handleSubmit((data) => {
    const dailyCalories = calculateBMR(data);
    alert(`Your daily calorie intake should be approximately ${dailyCalories.toFixed(2)} calories.`);
  });
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6">Calorie Counter</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Units:</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" {...register("units")} value="US" />
                <span className="ml-2">U.S. (Imperial)</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio" {...register("units")} value="Metric" />
                <span className="ml-2">Metric</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Sex:</label>
            <select className="form-select block w-full mt-1" {...register("sex", { required: true })}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.sex && <p className="text-red-500 text-xs italic">This field is required.</p>}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
              <input type="number" className="form-input block w-full mt-1" {...register("age", { required: true })} />
              {errors.age && <p className="text-red-500 text-xs italic">This field is required.</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Height:</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Feet" className="form-input block w-full mt-1" {...register("heightFeet", { required: true })} />
                <input type="number" placeholder="Inches" className="form-input block w-full mt-1" {...register("heightInches", { required: true })} />
              </div>
              {errors.heightFeet && <p className="text-red-500 text-xs italic">This field is required.</p>}
              {errors.heightInches && <p className="text-red-500 text-xs italic">This field is required.</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Weight: (kgs/pounds)</label>
            <input type="number" className="form-input block w-full mt-1" {...register("weight", { required: true })} />
            {errors.weight && <p className="text-red-500 text-xs italic">This field is required.</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Activity Level:</label>
            <select className="form-select block w-full mt-1" {...register("activityLevel", { required: true })}>
              <option value="">Select</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
              <option value="Very Active">Very Active</option>
            </select>
            {errors.activityLevel && <p className="text-red-500 text-xs italic">This field is required.</p>}
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CalorieCounter;

