import { snap } from "../lib/midtrans";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { order_id, customer, items } = req.body;

    const calculatedTotal = items.reduce(
      (sum: number, item: any) =>
        sum + parseInt(item.price, 10) * parseInt(item.quantity, 10),
      0
    );

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: calculatedTotal,
      },
      customer_details: {
        first_name: customer?.first_name || "Guest",
        last_name: customer?.last_name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
      },
      item_details: items?.map((item: any) => ({
        id: String(item.id),
        price: parseInt(item.price, 10),
        quantity: parseInt(item.quantity, 10),
        name: String(item.name).slice(0, 50),
      })),
      notification_url: `${process.env.BASE_URL}/api/paymentNotification`,
    };

    const transaction = await snap.createTransaction(parameter);

    return res.status(200).json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err: any) {
    return res.status(500).send("Failed to create transaction");
  }
}
