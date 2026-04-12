import { XCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contexts/AuthContext";

const ErrorMessage = () => {
  const { error, setError } = useAuth();

  if (!error) return null;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-red-50 p-4 mt-4 rounded-md">
        <div className="flex items-start gap-2">
          {/* Icon */}
          <XCircleIcon
            onClick={() => setError("")}
            className="h-5 w-5 text-red-500 cursor-pointer mt-0.5"
          />

          {/* Message */}
          <h3 className="text-sm font-medium text-red-800">Error: {error}</h3>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
