import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { regionList: string[]; selectedRegion: string } = {
  regionList: [],
  selectedRegion: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setRegionList: (state, action: PayloadAction<string[]>) => {
      state.regionList = action.payload;
    },
    setSelectedRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
    },
  },
});

export const { setRegionList, setSelectedRegion } = filterSlice.actions;
export default filterSlice.reducer;
