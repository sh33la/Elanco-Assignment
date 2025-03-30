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
        const response = region
          ? await countryService.getCountriesByRegion(region)
          : await countryService.getCountriesList();

        if (response.status !== 200) {
          throw new Error(response.data || "Failed to fetch countries");
        }

        const countryData = region
          ? response.data.map((country: any) => ({
              name: country?.name?.common,
              flag: country?.flags?.svg,
              region: country?.region,
              countryCode: country?.cca3,
            }))
          : response.data;

        dispatch(fetchCountriesSuccess(countryData));
      } catch (error) {
        dispatch(fetchCountriesFailure("Failed to fetch country details"));
      }
    },
    [dispatch]
  );

  return (
    <div>
      <select
        className="p-2 border border-gray-300 rounded-md w-full"
        value={selectedRegion}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option key={"all_regions"} value={""}>
          {"All"}
        </option>
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
