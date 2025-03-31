import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getCurrentTimeFromOffset } from "../utils/functions";

function TimeDisplay() {
  const { countryDetails, loading } = useSelector(
    (state: RootState) => state.country
  );
  return (
    <div className="mt-4 p-4 rounded-lg border border-gray-200 text-center">
      <p className="text-lg font-medium text-gray-800">
        &#128339; Time Zone: {!loading && countryDetails?.timezones?.[0]}
      </p>
      <div className="mt-2 text-lg font-semibold text-gray-700">
        &#8987; Current Time:{" "}
        {!loading &&
          countryDetails?.timezones?.length &&
          getCurrentTimeFromOffset(countryDetails?.timezones?.[0])}
      </div>
    </div>
  );
}

export default TimeDisplay;
