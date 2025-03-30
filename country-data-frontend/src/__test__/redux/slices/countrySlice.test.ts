import { describe, expect, it } from "vitest";
import {
  clearCountryDetails,
  fetchCountriesFailure,
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountryDetailsFailure,
  fetchCountryDetailsStart,
  fetchCountryDetailsSuccess,
} from "../../../redux/slices/countrySlice";
import { store } from "../../../redux/store";

const countriesList = [
  {
    name: "India",
    countryCode: "IN",
    flag: "https://flagcdn.com/in.svg",
    region: "Asia",
  },
];

const countryDetails = {
  name: "India",
  flag: "https://flagcdn.com/in.svg",
  population: 1380004385,
  languages: {
    eng: "English",
    hin: "Hindi",
    tam: "Tamil",
  },
  region: "Asia",
  currency: {
    INR: {
      name: "Indian rupee",
      symbol: "₹",
    },
  },
  timezones: ["UTC+05:30"],
};

describe("Country Slice", () => {
  it("should handle fetchCountriesStart", () => {
    store.dispatch(fetchCountriesStart());
    const state = store.getState().country;
    expect(state.loading).toBe(true);
  });

  it("should handle fetchCountriesSuccess", () => {
    store.dispatch(fetchCountriesSuccess(countriesList));
    const state = store.getState().country;
    expect(state.loading).toBe(false);
    expect(state.countries).toEqual(countriesList);
  });

  it("should handle fetchCountriesFailure", () => {
    store.dispatch(fetchCountriesFailure("Error fetching countries"));
    const state = store.getState().country;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Error fetching countries");
  });

  it("should handle fetchCountryDetailsStart", () => {
    store.dispatch(fetchCountryDetailsStart());
    const state = store.getState().country;
    expect(state.loading).toBe(true);
  });

  it("should handle fetchCountryDetailsSuccess", () => {
    store.dispatch(fetchCountryDetailsSuccess(countryDetails));
    const state = store.getState().country;
    expect(state.loading).toBe(false);
    expect(state.countryDetails).toEqual(countryDetails);
  });

  it("should handle fetchCountryDetailsFailure", () => {
    store.dispatch(fetchCountryDetailsFailure("Error fetching countries"));
    const state = store.getState().country;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Error fetching countries");
  });

  it("should handle clearCountryDetails", () => {
    store.dispatch(clearCountryDetails());
    const state = store.getState().country;
    expect(state.loading).toBe(false);
    expect(state.countryDetails).toStrictEqual({});
  });
});
