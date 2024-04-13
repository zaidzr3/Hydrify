import React, { useContext, useState } from "react";

type SearchContext = {
  name: string;
  seller: string;
  caloriesPerServing: number;
  beverageId: string;
  saveSearchValues: (
    name: string,
    seller: string,
    caloriesPerServing: number,
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [name, setName] = useState<string>(
    () => sessionStorage.getItem("name") || ""
  );
  
  const [caloriesPerServing, setCaloriesPerServing] = useState<number>(() =>
    parseInt(sessionStorage.getItem("caloriesPerServing") || "1")
  );

  const [beverageId, setBeverageId] = useState<string>(
    () => sessionStorage.getItem("beverageID") || ""
  );

  const [seller, setSeller] = useState<string>(
    () => sessionStorage.getItem("seller") || ""
  );
  

  const saveSearchValues = (
    name: string,
    seller: string,
    caloriesPerServing: number,
    beverageId?: string
  ) => {
    setName(name);
    setCaloriesPerServing(caloriesPerServing);
    setSeller(seller);

    if (beverageId) {
      setBeverageId(beverageId);
    }

    sessionStorage.setItem("name", name);
    sessionStorage.setItem("caloriesPerServing", caloriesPerServing.toString());
    sessionStorage.setItem("seller", seller);

    if (beverageId) {
      sessionStorage.setItem("beverageId", beverageId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        name,
        caloriesPerServing,
        seller,
        beverageId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};