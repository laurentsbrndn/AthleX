import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";
import { getUserCheckouts } from "../../services/checkout";
import type { CheckoutDataInterface } from "../../types/checkout";
import { Timestamp } from "firebase/firestore";

interface TransactionHistoryProps {
  user: User | null;
}

export const TransactionHistoryComponents = ({ user }: TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<CheckoutDataInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await getUserCheckouts(user.uid);

        const fixedData = data.map((tx) => ({
          ...tx,
          createdAt:
            tx.createdAt && "toDate" in tx.createdAt
              ? tx.createdAt
              : (tx.createdAt as unknown as Timestamp),
        }));

        fixedData.sort((a, b) => {
          const aDate = (a.createdAt as Timestamp)?.toDate()?.getTime?.() || 0;
          const bDate = (b.createdAt as Timestamp)?.toDate()?.getTime?.() || 0;
          return bDate - aDate;
        });

        setTransactions(fixedData);
      } 
      catch (err) {
        console.error("Failed to fetch transactions:", err);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading transactions...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="flex justify-center text-black-400">
          <i className="bi bi-receipt text-6xl"></i>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">No Transactions Found</h3>
        <p className="text-gray-500 max-w-md">
          You don’t have any transaction history yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="mb-10 text-3xl font-bold text-gray-800 text-center flex items-center justify-center gap-2">
        Transaction History
      </h2>

      {transactions.map((tx) => {
        const createdAt = tx.createdAt as Timestamp; 
        return (
          <div
            key={tx.orderId || tx.checkoutId}
            className="rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow bg-white space-y-4"
          >
            {createdAt && (
              <p className="text-sm text-gray-500">
                {createdAt.toDate().toLocaleString("id-ID")}
              </p>
            )}

            <div className="space-y-2">
              {tx.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b border-gray-100 pb-2 last:border-none"
                >
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Rp {item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <p className="text-gray-700 text-lg font-semibold">Total:</p>
              <p className="text-xl font-bold text-gray-900">
                Rp {tx.total.toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
