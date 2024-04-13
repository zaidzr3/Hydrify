import { beverageNutritionalFacts } from "../config/beverage-options-config";

type Props = {
  selectedNutritionalFacts: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const NutritionalFactsFilter = ({ selectedNutritionalFacts, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Nutritional Facts</h4>
      {beverageNutritionalFacts.map((nutritionalFact) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={nutritionalFact}
            checked={selectedNutritionalFacts.includes(nutritionalFact)}
            onChange={onChange}
          />
          <span>{nutritionalFact}</span>
        </label>
      ))}
    </div>
  );
};

export default NutritionalFactsFilter;