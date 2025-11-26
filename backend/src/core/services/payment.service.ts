import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();

export class PaymentService {
  // Snap untuk create token
  private static snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY || "",
    clientKey: process.env.MIDTRANS_CLIENT_KEY || ""
  });

  // CoreApi untuk handle notification
  private static core = new midtransClient.CoreApi({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY || "",
    clientKey: process.env.MIDTRANS_CLIENT_KEY || ""
  });

  // --- FUNGSI 1: CREATE TOKEN ---
  static async createTransactionToken(order: any) {
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${order.id}-${Date.now()}`,
        gross_amount: order.totalPrice,
      },
      customer_details: {
        first_name: order.customerName,
      },
      item_details: order.items.map((item: any) => ({
        id: item.menuId.toString(),
        price: item.price,
        quantity: item.qty,
        name: item.menu.name
      }))
    };

    const transaction = await this.snap.createTransaction(parameter);
    return transaction.token;
  }

  // --- FUNGSI 2: VERIFIKASI NOTIFIKASI ---
  static async verifyNotification(notificationBody: any) {
    return await (this.core as any).transaction.notification(notificationBody);
  }
}
