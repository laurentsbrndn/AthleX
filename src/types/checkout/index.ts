import { FieldValue } from "firebase/firestore";

export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageURL: string;
  cartDocId?: string;
}

export type CheckoutStatus =
  | "pending"
  | "settlement"
  | "capture"
  | "deny"
  | "expire"
  | "cancel";

export interface CheckoutDataInterface {
  userId: string;
  items: CheckoutItem[];
  total: number;
  shippingAddress: string;
  status: CheckoutStatus;
  orderId?: string;
  createdAt?: FieldValue;
  checkoutId?: string;
}
