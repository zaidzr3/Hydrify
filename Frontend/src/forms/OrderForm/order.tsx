import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  beverageId: string;
  price: number;
};

type OrderFormData = {
  caloriesPerServing: number;
  name: string;
  seller: string
};

const OrderForm = ({ beverageId, price }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      caloriesPerServing: search.caloriesPerServing,
    },
  });


  const onSignInClick = (data: OrderFormData) => {
    search.saveSearchValues(
      "",
      "",data.caloriesPerServing,
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: OrderFormData) => {
    search.saveSearchValues(
      "",
      "",
      data.caloriesPerServing
    );
    navigate(`/beverage/${beverageId}/ordering`);
  };

  return (
    <div className="flex flex-col p-4 bg-teal-200 gap-4">
      <h3 className="text-md font-bold">£{price}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
        
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Numer of Items:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                
                {...register("caloriesPerServing", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
          </div>
          {isLoggedIn ? (
            <button className="bg-gray-900 text-teal-400 h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Order Now
            </button>
          ) : (
            <button className="bg-gray-900 text-teal-400 h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Order
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderForm;