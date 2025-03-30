import { describe, expect, it } from "vitest";
import { RootState, store } from "../../redux/store";

describe("Redux Store", () => {
  it("should initialize with the correct default state", () => {
    const state: RootState = store.getState();
    expect(state).toEqual({
      country: {
        countries: [],
        countryDetails: {},
        loading: false,
        error: null,
      },
      search: {
        searchTerm: "",
      },
      filter: {
        regionList: [],
        selectedRegion: "",
      },
    });
  });
});
