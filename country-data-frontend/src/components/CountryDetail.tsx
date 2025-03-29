import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function CountryDetail() {
  const { countryDetails, loading, error } = useSelector(
    (state: RootState) => state.country
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {/* Display filtered countries */}
      <div className="bg-white rounded-lg shadow-md p-4 ">
        {/* Accessing the flag from the 'flag' property */}
        {countryDetails.flag ? (
          <Image
            className="w-10 h-10 object-cover"
            src={countryDetails.flag}
            alt={`Flag of ${countryDetails.name}`}
            width={40}
            height={40}
          />
        ) : (
          <p className="text-center">No Flag Available</p>
        )}
        <div className="mt-2 text-center">
          <h2>{countryDetails.name}</h2>
          <p>{countryDetails.region}</p>
        </div>
      </div>
    </>
  );
}

export default CountryDetail;
