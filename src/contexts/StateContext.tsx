import { createContext, useState, useMemo, useEffect, ReactNode } from "react";
import { getAllData } from "../api/api-uni";
// import { sorterAsc } from "../helper";

// interface StateContextType {
//   allData: CountryType[];
//   setAllData: (): React.Dispatch<React.SetStateAction<never[]>>
// }

// const StateContext = createContext<StateContextType | null>(null);
const StateContext = createContext<any | null>(null);

const StateContextProvider = (props: { children: ReactNode }) => {
  const [allData, setAllData] = useState<CountryType[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const countries = useMemo(() => filterCountries(allData), [allData]);

  useEffect(() => {
    (async () => {
      const data = await getAllData();

      // Correct data, there is "UK" record, which is invalid
      const uk: CountryType[] = data.filter(
        (c: CountryType) => c.alpha_two_code === "UK"
      );
      for (let i: number = 0; i < uk.length; i++) {
        uk[i].country = "United Kingdom";
        uk[i].alpha_two_code = "GB";
      }

      setAllData(data);
    })();
    // We fetch data only on startup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const state = {
    allData,
    setAllData,
    rowsPerPage,
    setRowsPerPage,
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
      id: country.id,
      alpha_two_code: code,
      country: country.country,
      count: allData.filter((c) => c.alpha_two_code === code).length,
    });
  }
  return countries;
};

export { StateContext, StateContextProvider };
