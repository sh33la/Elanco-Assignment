import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/slices/searchSlice";
import { AppDispatch, RootState } from "../redux/store";

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm } = useSelector((state: RootState) => state.search);

  const handleSearchTerm = (value: string) => {
    // if (!value) {
    //   return;
    // }
    dispatch(setSearchTerm(value));
  };

  return (
    <div>
      SearchBar {/* Search Input */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-gray-700">
          Search for a Country
        </label>
        <input
          id="search"
          type="text"
          placeholder="Enter country name"
          className="border border-gray-300"
          value={searchTerm}
          onChange={(e) => handleSearchTerm(e.target.value.trim())}
        />
      </div>
      {/* <div className="mb-4">
          <select
            className="p-2 border rounded w-full"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions?.map((region: string) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div> */}
    </div>
  );
}

export default SearchBar;
