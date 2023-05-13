import React, { createContext, useState, useMemo, ReactNode } from "react";

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
  const countryCodes = new Set<String>();
  const countries: CountryType[] = [];

  if (allData) {
    allData.map((c) => countryCodes.add(c.alpha_two_code));
  }

  for (const code of countryCodes) {
    const country: CountryType =
      allData[allData.findIndex((c) => c.alpha_two_code === code)];
    countries.push({
      alpha_two_code: code,
      country: country.country,
      name: country.name,
    });
  }

  return countries;
};

export { StateContext, StateContextProvider };
