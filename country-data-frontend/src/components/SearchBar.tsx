import { useCallback } from "react";
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
  const { searchTerm } = useSelector((state: RootState) => state.search);

  const handleChange = (searchValue: string) => {
    dispatch(setSearchTerm(searchValue));
    if (isNumeric(searchValue) || searchValue.includes("UTC")) {
      searchCountries(searchValue, "timezone");
    } else if (/^[A-Za-z\s]+$/.test(searchValue)) {
      searchCountries(searchValue, "name");
    }
  };

  const searchCountries = useCallback(
    async (searchValue: string, searchParam: string) => {
      dispatch(fetchCountriesStart());
      try {
        const response = await countryService.searchCountries({
          [searchParam]: searchValue,
        });
        if (response.status === 200) {
          const countryDetails: ICountry[] = response?.data?.map(
            (country: any) => ({
              name: country?.name?.common,
              flag: country?.flags?.svg,
              region: country?.region,
              countryCode: country?.cca3,
            })
          );
          dispatch(fetchCountriesSuccess(countryDetails));
        } else {
          dispatch(fetchCountriesFailure(response.data));
        }
      } catch (err) {
        dispatch(fetchCountriesFailure("Failed to fetch country details"));
      }
    },
    [dispatch]
  );

  return (
    <div>
      SearchBar {/* Search Input */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-gray-700">
          Search for a Country
        </label>
        <input
          id="search"
          type="text"
          placeholder="Enter country name"
          className="border border-gray-300"
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value.trim())}
        />
      </div>
    </div>
  );
}

export default SearchBar;
