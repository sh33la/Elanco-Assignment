import { useDispatch, useSelector } from "react-redux";
import { setSelectedRegion } from "../redux/slices/filterSlice";
import { AppDispatch, RootState } from "../redux/store";

function FilterDropDown() {
  const dispatch = useDispatch<AppDispatch>();
  const { regionList, selectedRegion } = useSelector(
    (state: RootState) => state.filter
  );
  const handleSelect = (region: string) => {
    dispatch(setSelectedRegion(region));
  };
  return (
    <div className="mb-4">
      <select
        className="p-2 border rounded w-full"
        value={selectedRegion}
        onChange={(e) => handleSelect(e.target.value)}
      >
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
