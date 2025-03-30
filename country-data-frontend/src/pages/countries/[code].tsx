import BackButton from "@/src/components/BackButton";
import CountryDetail from "@/src/components/CountryDetail";
import {
  fetchCountryDetailsFailure,
  fetchCountryDetailsStart,
  fetchCountryDetailsSuccess,
} from "@/src/redux/slices/countrySlice";
import { AppDispatch } from "@/src/redux/store";
import { countryService } from "@/src/services/countryService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function CountryCode() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { code } = router.query;
  const countryCode = Array.isArray(code) ? code[0] : code ?? "";

  useEffect(() => {
    const fetchCountryDetails = async () => {
      dispatch(fetchCountryDetailsStart());
      try {
        const response = await countryService.getCountryByCode(countryCode);
        if (response.status === 200) {
          dispatch(fetchCountryDetailsSuccess(response.data));
        } else {
          dispatch(fetchCountryDetailsFailure(response.data));
        }
      } catch (error) {
        dispatch(fetchCountryDetailsFailure("Failed to fetch country details"));
      }
    };
    if (countryCode) {
      fetchCountryDetails();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      {/* Country Detail - Centered */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <CountryDetail />
      </div>

      {/* Back Button - Positioned at bottom-right corner */}
      <div className="fixed bottom-6 right-6">
        <BackButton />
      </div>
    </div>
  );
}

export default CountryCode;
