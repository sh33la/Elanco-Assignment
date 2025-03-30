import filterReducer, {
  setRegionList,
  setSelectedRegion,
} from "../../../redux/slices/filterSlice";

describe("filterSlice Reducer", () => {
  const initialState = {
    regionList: [],
    selectedRegion: "",
  };
  it("should handle `setRegionList` action", () => {
    const regionList = ["Asia", "Europe", "Africa"];
    const newState = filterReducer(initialState, setRegionList(regionList));

    expect(newState.regionList).toEqual(regionList);
    expect(newState.selectedRegion).toBe(""); // Ensure other state properties are unchanged
  });

  it("should handle `setSelectedRegion` action", () => {
    const newState = filterReducer(initialState, setSelectedRegion("Asia"));

    expect(newState.selectedRegion).toBe("Asia");
    expect(newState.regionList).toEqual([]); // Ensure other state properties are unchanged
  });
});
