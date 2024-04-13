import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import BeverageFlavorsFilter from "../components/BeverageFlavorsFilter";
import NutritionalFactsFilter from "../components/NutritionalFactsFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedBeverageFlavors, setSelectedBeverageFlavors] = useState<string[]>([]);
  const [selectedNutritionalFacts, setSelectedNutritionalFacts] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    name: search.name,
    seller: search.seller,
    caloriesPerServing: search.caloriesPerServing.toString(),
    page: page.toString(),
    stars: selectedStars,
    flavors: selectedBeverageFlavors,
    nutritionalFacts: selectedNutritionalFacts,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: beverageData } = useQuery(["searchBeverages", searchParams], () =>
    apiClient.searchBeverages(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleBeverageFlavorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const beverageFlavor = event.target.value;

    setSelectedBeverageFlavors((prevBeverageFlavors) =>
      event.target.checked
        ? [...prevBeverageFlavors, beverageFlavor]
        : prevBeverageFlavors.filter((beverage) => beverage !== beverageFlavor)
    );
  };

  const handleNutritionalFactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nutritionalFact = event.target.value;

    setSelectedNutritionalFacts((prevNutritionalFacts) =>
      event.target.checked
        ? [...prevNutritionalFacts, nutritionalFact]
        : prevNutritionalFacts.filter((prevNutritionalFact) => prevNutritionalFact !== nutritionalFact)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <BeverageFlavorsFilter
            selectedBeverageFlavors={selectedBeverageFlavors}
            onChange={handleBeverageFlavorChange}
          />
          <NutritionalFactsFilter
            selectedNutritionalFacts={selectedNutritionalFacts}
            onChange={handleNutritionalFactChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {beverageData?.pagination.total} Beverages found
            {search.name ? ` in ${search.name}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="priceAsc">
              Price (low to high)
            </option>
            <option value="priceDesc">
              Price (high to low)
            </option>
          </select>
        </div>
        {beverageData?.data.map((beverage) => (
          <SearchResultsCard beverage={beverage} />
        ))}
        <div>
          <Pagination
            page={beverageData?.pagination.page || 1}
            pages={beverageData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;