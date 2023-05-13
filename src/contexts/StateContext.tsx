import React, { createContext, useState, ReactNode } from "react";

interface StateContextType {
  allData: any[];
}

type Country = {
  domains: String[];
  country: String;
  alpha_two_code: String;
  "state-province": String | null;
  web_pages: String[];
  name: String;
};

const StateContext = createContext<StateContextType | null>(null);

const StateContextProvider = (props: { children: ReactNode }) => {
  const [allData, setAllData] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(15);

  const getCountries = (): Country[] => {
    const countries: Country[] = [];

    return countries;
  };

  const state = { allData, setAllData, resultsPerPage, setResultsPerPage };

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContext, StateContextProvider };
