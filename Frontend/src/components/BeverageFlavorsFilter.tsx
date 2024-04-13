import { beverageFlavors } from "../config/beverage-options-config";

type Props = {
  selectedBeverageFlavors: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const BeverageFlavorsFilter = ({ selectedBeverageFlavors, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Beverage Flavor</h4>
      {beverageFlavors.map((beverageFlavor) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={beverageFlavor}
            checked={selectedBeverageFlavors.includes(beverageFlavor)}
            onChange={onChange}
          />
          <span>{beverageFlavor}</span>
        </label>
      ))}
    </div>
  );
};

export default BeverageFlavorsFilter;