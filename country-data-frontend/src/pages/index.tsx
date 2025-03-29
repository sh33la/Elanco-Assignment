import { useSelector } from "react-redux";
import CountryList from "../components/CountryList";
import Header from "../components/Header";
import { RootState } from "../redux/store";

export default function Home() {
  const { loading, error } = useSelector((state: RootState) => state.country);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <Header />
      <CountryList />
    </div>
  );
}
