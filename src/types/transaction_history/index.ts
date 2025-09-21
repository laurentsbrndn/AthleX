export interface TransactionHistoryInterface {
  orderId: string;
  total: number;
  status: string;
  createdAt: number;
  items: {
    name: string;
    price: number;
    quantity: number;
    imageURL: string;
  }[];
}