import React, { createContext, useState, useMemo, ReactNode } from "react";
import { sorterAsc } from "../helper";

// interface StateContextType {
//   allData: CountryType[];
//   setAllData: (): React.Dispatch<React.SetStateAction<never[]>>
// }

// const StateContext = createContext<StateContextType | null>(null);
const StateContext = createContext<any | null>(null);

const StateContextProvider = (props: { children: ReactNode }) => {
  const [allData, setAllData] = useState<CountryType[]>([]);
  const [resultsPerPage, setResultsPerPage] = useState(15);
  const countries = useMemo(() => filterCountries(allData), [allData]);

  const state = {
    allData,
    setAllData,
    resultsPerPage,
    setResultsPerPage,
    countries,
  };

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
};

const filterCountries = (allData: CountryType[]): CountryType[] => {
  const countryCodes = new Set<string>();
  const countries: CountryType[] = [];

  allData.map((c) => countryCodes.add(c.alpha_two_code));
  for (const code of countryCodes) {
    const country: CountryType =
      allData[allData.findIndex((c) => c.alpha_two_code === code)];
    countries.push({
      alpha_two_code: code,
      country: country.country,
    });
  }
  countries.sort(sorterAsc("country"));
  return countries;
};

export { StateContext, StateContextProvider };
