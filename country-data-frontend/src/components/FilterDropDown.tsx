import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountriesFailure,
  fetchCountriesStart,
  fetchCountriesSuccess,
} from "../redux/slices/countrySlice";
import { setSelectedRegion } from "../redux/slices/filterSlice";
import { AppDispatch, RootState } from "../redux/store";
import { countryService } from "../services/countryService";
import { ICountry } from "../types/country";

function FilterDropDown() {
  const dispatch = useDispatch<AppDispatch>();
  const { regionList, selectedRegion } = useSelector(
    (state: RootState) => state.filter
  );
  const handleSelect = (region: string) => {
    dispatch(setSelectedRegion(region));
    searchCountries(region);
  };

  const searchCountries = useCallback(
    async (region: string) => {
      dispatch(fetchCountriesStart());
      try {
        const response = await countryService.getCountriesByRegion(region);
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
    <div className="mb-4">
      <select
        className="p-2 border rounded w-full"
        value={selectedRegion}
        onChange={(e) => handleSelect(e.target.value)}
      >
        {regionList?.map((region: string) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropDown;
