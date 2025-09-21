import midtransClient from "midtrans-client";

const serverKey = process.env.MIDTRANS_SERVER_KEY!;
const clientKey = process.env.MIDTRANS_CLIENT_KEY!;

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey,
  clientKey,
});
