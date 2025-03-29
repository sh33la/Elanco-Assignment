import { ICountry, ICountryState } from "@/src/types/country";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICountryState = {
  countries: [],
  countryDetails: {},
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    fetchCountriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCountriesSuccess: (state, action: PayloadAction<ICountry[]>) => {
      state.countries = action.payload;
      state.loading = false;
    },
    fetchCountriesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchCountryDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCountryDetailsSuccess: (state, action: PayloadAction<object>) => {
      state.countryDetails = action.payload;
      state.loading = false;
    },
    fetchCountryDetailsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCountryDetails: (state) => {
      state.countryDetails = {};
    },
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
  fetchCountryDetailsStart,
  fetchCountryDetailsSuccess,
  fetchCountryDetailsFailure,
  clearCountryDetails,
} = countrySlice.actions;
export default countrySlice.reducer;
