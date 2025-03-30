import { useRouter } from "next/router";

function BackButton() {
  const router = useRouter();
  return (
    <div className="w-full max-w-md">
      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
      >
        ← Back
      </button>
    </div>
  );
}

export default BackButton;
