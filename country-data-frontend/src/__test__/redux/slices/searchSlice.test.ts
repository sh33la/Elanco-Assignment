import searchReducer, {
  setSearchTerm,
} from "../../../redux/slices/searchSlice";

describe("searchSlice Reducer", () => {
  const initialState = { searchTerm: "" };

  it("should handle `setSearchTerm` action", () => {
    const newState = searchReducer(initialState, setSearchTerm("India"));

    expect(newState.searchTerm).toBe("India");
  });

  it("should update `searchTerm` when a new value is provided", () => {
    const modifiedState = { searchTerm: "Japan" };
    const newState = searchReducer(modifiedState, setSearchTerm("Germany"));

    expect(newState.searchTerm).toBe("Germany");
  });

  it("should clear `searchTerm` when an empty string is provided", () => {
    const modifiedState = { searchTerm: "France" };
    const newState = searchReducer(modifiedState, setSearchTerm(""));

    expect(newState.searchTerm).toBe("");
  });
});
