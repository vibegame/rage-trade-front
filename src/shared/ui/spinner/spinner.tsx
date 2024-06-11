export default function Spinner() {
  return (
    <svg
      className="size-5 animate-spin text-gray-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4v4c-3.309 0-6.164 1.996-7.41 4.854L6 13.291z"
      ></path>
    </svg>
  );
}
