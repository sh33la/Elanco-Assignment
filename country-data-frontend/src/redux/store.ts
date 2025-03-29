import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./slices/countrySlice";
import filterReducer from "./slices/filterSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    filter: filterReducer,
    search: searchReducer,
  },
});

//TypeScript types for redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
