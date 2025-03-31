import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCountryDetails } from "../redux/slices/countrySlice";
import { AppDispatch, RootState } from "../redux/store";
import TimeDisplay from "./TimeDisplay";

function CountryDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { countryDetails, loading, error } = useSelector(
    (state: RootState) => state.country
  );

  useEffect(() => {
    return () => {
      dispatch(clearCountryDetails());
    };
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
          {/* Flag */}
          {countryDetails?.flag ? (
            <Image
              className="w-20 h-14 mx-auto mb-4 object-cover rounded"
              src={countryDetails?.flag}
              alt={`Flag of ${countryDetails?.name}`}
              width={80}
              height={56}
            />
          ) : (
            <p className="text-gray-500">No Flag Available</p>
          )}

          {/* Country Name */}
          <h1 className="text-2xl font-bold text-gray-800">
            {countryDetails?.name}
          </h1>
          <p className="text-gray-500 text-lg">
            &#127760; {countryDetails?.region}
          </p>

          {/* Time Display */}
          <TimeDisplay />

          {/* Country Details */}
          <div className="mt-4 text-left">
            <p className="text-gray-500 text-lg">
              &#127963; Capital: {countryDetails?.capital?.[0]}
            </p>
            <p className="text-lg font-medium">
              &#127968; Population:{" "}
              <span className="font-normal text-gray-700">
                {countryDetails?.population?.toLocaleString()}
              </span>
            </p>
            <h2 className="text-xl font-semibold mt-3">&#128483; Languages</h2>
            {countryDetails?.languages ? (
              <ul className="list-disc pl-6 text-gray-700">
                {Object.keys(countryDetails?.languages)?.map((key) => (
                  <li key={key}>{countryDetails?.languages?.[key]}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No language data available</p>
            )}

            <h2 className="text-xl font-semibold mt-3">&#128176; Currency</h2>
            {countryDetails?.currency ? (
              <ul className="list-disc pl-6 text-gray-700">
                {Object.keys(countryDetails?.currency).map((key) => (
                  <li key={key}>
                    {countryDetails?.currency?.[key]?.name} (
                    {countryDetails?.currency?.[key]?.symbol})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No currency data available</p>
            )}
          </div>
        </div>
        <div className="mt-5">
          <a
            href={countryDetails?.maps?.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            &#128205; View on Google Maps
          </a>
          <br />
          <a
            href={countryDetails?.maps?.openStreetMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            &#128506; View on OpenStreetMap
          </a>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
