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
        <h2>Name: {countryDetails?.name}</h2>
        <p>Region: {countryDetails?.region}</p>
        <p>Population: {countryDetails?.population}</p>
        <h2>Language(s)</h2>
        {countryDetails?.languages &&
          Object.keys(countryDetails?.languages)?.map((key: string) => (
            <p key={key}>{countryDetails?.languages?.[key]}</p>
          ))}
        <h2>currency</h2>
        {countryDetails?.currency &&
          Object.keys(countryDetails?.currency)?.map((key: string) => (
            <div key={key}>
              <p>name: {countryDetails?.currency?.[key]?.name}</p>
              <p>symbol: {countryDetails?.currency?.[key]?.symbol}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CountryDetail;
