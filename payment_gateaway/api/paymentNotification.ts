import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)
    ),
  });
}

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const notification = req.body;
    const { order_id, transaction_status, fraud_status } = notification;


    if (!order_id) {
      res.status(400).send("Missing order_id");
      return;
    }

    const [checkoutId, userId] = order_id.split("-");
    if (!checkoutId || !userId) {
      res.status(400).send("Invalid order_id format");
      return;
    }

    let newStatus: string;
    switch (transaction_status) {
      case "capture":
        newStatus = fraud_status === "accept" ? "settlement" : "challenge";
        break;
      case "settlement":
        newStatus = "settlement";
        break;
      case "pending":
        newStatus = "pending";
        break;
      case "deny":
        newStatus = "deny";
        break;
      case "expire":
        newStatus = "expire";
        break;
      case "cancel":
        newStatus = "cancel";
        break;
      default:
        newStatus = "pending";
    }

    const checkoutRef = db
      .collection("users")
      .doc(userId)
      .collection("checkouts")
      .doc(checkoutId);

    const checkoutSnap = await checkoutRef.get();
    if (!checkoutSnap.exists) {
      res.status(404).send("Checkout not found");
      return;
    }

    const checkoutData = checkoutSnap.data() || {};

    await checkoutRef.update({
      status: newStatus,
      updatedAt: FieldValue.serverTimestamp(),
    });

    console.log(`✅ Checkout ${checkoutId} updated to ${newStatus}`);

    if (newStatus === "settlement" && Array.isArray(checkoutData.items)) {
      const cartRef = db.collection("users").doc(userId).collection("carts");
      const batch = db.batch();

      checkoutData.items.forEach((item: any) => {
        if (item?.cartDocId) {
          const cartDoc = cartRef.doc(item.cartDocId);
          batch.delete(cartDoc); 
        }

    if (item?.productId && typeof item.quantity === "number") {
      const productRef = db.collection("products").doc(item.productId);
      batch.update(productRef, {
        stock: admin.firestore.FieldValue.increment(-item.quantity),
      });
    }});

      await batch.commit();
    }

    res.json({ message: "Checkout updated", status: newStatus });
  } catch (err) {
    res.status(500).send("Webhook error");
  }
}
