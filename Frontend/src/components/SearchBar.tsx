import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { BsSearchHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [name, setName] = useState<string>(search.name);
  const [caloriesPerServing, setCaloriesPerServing] = useState<number>(search.caloriesPerServing);
  const [seller, setSeller] = useState<string>(search.seller);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      name,
      seller,
      caloriesPerServing, 
    );
    navigate("/search");
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-teal-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <BsSearchHeartFill size={25} className="mr-2" />
        <input
          placeholder="What would you like?"
          className="text-md w-full focus:outline-none"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Calories(kcal):
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            value={caloriesPerServing}
            onChange={(event) => setCaloriesPerServing(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <input
          placeholder="Company"
          className="text-md w-full focus:outline-none"
          value={seller}
          onChange={(event) => setSeller(event.target.value)}
        />
      </div>

      <div className="flex gap-1">
        <button className="w-2/3 bg-gray-900 text-teal-400 h-full p-2 rounded-lg font-bold text-xl hover:bg-teal-600">
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white h-full p-2 rounded-lg font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;