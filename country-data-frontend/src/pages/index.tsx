import CountryList from "../components/CountryList";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-6 ">
      <Header />
      <CountryList />
    </div>
  );
}
