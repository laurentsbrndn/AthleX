import { useNavigate } from "react-router-dom";

export const TransactionSuccessComponents = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-600 transition"
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
};

