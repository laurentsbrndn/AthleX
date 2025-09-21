// import { db } from "../../config/firebase";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import type { TransactionHistoryInterface } from "../../types/transaction_history";
// import type { CheckoutDataInterface } from "../../types/checkout";

// export const getUserTransactions = async (userId: string) => {
//   const checkoutCol = collection(db, "users", userId, "checkout");
//   const q = query(checkoutCol, orderBy("createdAt", "desc"));
//   const snapshot = await getDocs(q);

//   return snapshot.docs.map((doc) => {
//     const data = doc.data() as CheckoutDataInterface;

//     return {
//       orderId: doc.id,
//       total: data.total,
//       status: data.status,
//       createdAt: "toMillis" in data.createdAt ? data.createdAt.toMillis() : Date.now(),
//       items: data.items.map((item) => ({
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         imageURL: item.imageURL,
//       })),
//     } as TransactionHistoryInterface;
//   });
// };
