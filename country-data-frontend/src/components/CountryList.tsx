import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { countryService } from "../services/countryService";
import { ICountry } from "../types/country";
import CountryCard from "./CountryCard";

import {
  fetchCountriesFailure,
  fetchCountriesStart,
  fetchCountriesSuccess,
} from "../redux/slices/countrySlice";
import { setRegionList } from "../redux/slices/filterSlice";

function CountryList() {
  const dispatch = useDispatch<AppDispatch>();
  const { countries } = useSelector((state: RootState) => state.country);

  useEffect(() => {
    const fetchCountries = async () => {
      dispatch(fetchCountriesStart());
      try {
        const response = await countryService.getCountriesList();
        if (response.status === 200) {
          dispatch(fetchCountriesSuccess(response.data));
          // Get unique regions for dropdown
          const regionList: string[] = [
            "All",
            ...Array.from(
              new Set<string>(
                response?.data
                  ?.map((country: ICountry) => country.region)
                  .filter(Boolean)
              )
            ),
          ];
          dispatch(setRegionList(regionList));
        } else {
          dispatch(fetchCountriesFailure(response.data));
        }
      } catch (err) {
        dispatch(fetchCountriesFailure("Failed to fetch countries"));
      }
    };
    if (!countries.length) {
      fetchCountries();
    }
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {countries?.length > 0 ? (
        countries?.map((country: ICountry) => (
          <div key={country.countryCode}>
            <CountryCard country={country} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No countries found.</p>
      )}
    </div>
  );
}

export default CountryList;
