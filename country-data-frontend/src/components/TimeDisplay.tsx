import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getCurrentTimeFromOffset } from "../utils/functions";

function TimeDisplay() {
  const { countryDetails, loading } = useSelector(
    (state: RootState) => state.country
  );
  return (
    <div>
      {!loading && countryDetails?.timezones?.[0]}
      <div>
        {!loading &&
          countryDetails?.timezones?.length &&
          getCurrentTimeFromOffset(countryDetails?.timezones?.[0])}
      </div>
    </div>
  );
}

export default TimeDisplay;
