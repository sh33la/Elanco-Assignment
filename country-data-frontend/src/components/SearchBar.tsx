import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountriesFailure,
  fetchCountriesStart,
  fetchCountriesSuccess,
} from "../redux/slices/countrySlice";
import { setSearchTerm } from "../redux/slices/searchSlice";
import { AppDispatch, RootState } from "../redux/store";
import { countryService } from "../services/countryService";
import { ICountry } from "../types/country";
import { isNumeric } from "../utils/functions";

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const reduxSearchTerm = useSelector(
    (state: RootState) => state.search.searchTerm
  );
  const [inputValue, setInputValue] = useState(reduxSearchTerm);
  const [debouncedValue, setDebouncedValue] = useState(reduxSearchTerm);

  useEffect(() => {
    setInputValue(reduxSearchTerm);
    setDebouncedValue(reduxSearchTerm);
  }, [reduxSearchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== debouncedValue) {
        setDebouncedValue(inputValue);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    const fetchCountries = async () => {
      dispatch(fetchCountriesStart());

      try {
        const payload =
          isNumeric(debouncedValue) || debouncedValue.includes("UTC")
            ? { timezone: debouncedValue }
            : { name: debouncedValue, capital: debouncedValue };
        const response = await countryService.searchCountries(payload);
        if (response.status !== 200) {
          throw new Error(response.data || "Failed to fetch countries");
        }

        const countryDetails: ICountry[] = response?.data?.map(
          (country: any) => ({
            name: country?.name?.common,
            flag: country?.flags?.svg,
            region: country?.region,
            countryCode: country?.cca3,
          })
        );
        dispatch(fetchCountriesSuccess(countryDetails));
      } catch (err) {
        dispatch(fetchCountriesFailure("Failed to fetch countries"));
      }
    };

    if (reduxSearchTerm !== debouncedValue) {
      dispatch(setSearchTerm(debouncedValue));
      fetchCountries();
    }
  }, [debouncedValue, dispatch, reduxSearchTerm]);

  const handleChange = (value: string) => {
    setInputValue(value); // Update local state
  };

  return (
    <input
      type="text"
      placeholder="Search countries..."
      value={inputValue}
      onChange={(e) => handleChange(e.target.value.trim())}
      className="p-2 border border-gray-300 rounded-md w-[32ch] md:w-[40ch] lg:w-[50ch]"
    />
  );
}

export default SearchBar;
