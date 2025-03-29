import { useRouter } from "next/router";

function BackButton() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Back
      </button>
    </div>
  );
}

export default BackButton;
