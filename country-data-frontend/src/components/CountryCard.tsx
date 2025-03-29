import Image from "next/image";
import { useRouter } from "next/router";
import { ICountry } from "../types/country";

interface ICountryCard {
  country: ICountry;
}

function CountryCard(props: Readonly<ICountryCard>) {
  const { country } = props;
  const router = useRouter();

  return (
    <button
      key={country.name}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
      onClick={() => {
        router.push(`/countries/${country.countryCode}`);
      }}
    >
      {/* Accessing the flag from the 'flag' property */}
      {country.flag ? (
        <Image
          className="w-10 h-10 object-cover"
          src={country.flag}
          alt={`Flag of ${country.name}`}
          width={40}
          height={40}
        />
      ) : (
        <p className="text-center">No Flag Available</p>
      )}
      <div className="mt-2 text-center">
        <h2>{country.name}</h2>
        <p>{country.region}</p>
      </div>
    </button>
  );
}

export default CountryCard;
