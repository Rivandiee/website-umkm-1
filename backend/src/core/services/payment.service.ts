import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();

export class PaymentService {
  // Inisialisasi Snap Client
  private static snap = new midtransClient.Snap({
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
    }; // <--- PENUTUP OBJEK PARAMETER (PENTING)

    const transaction = await this.snap.createTransaction(parameter);
    return transaction.token;
  } // <--- PENUTUP FUNGSI createTransactionToken (PENTING)

  // --- FUNGSI 2: VERIFIKASI NOTIFIKASI (DIPISAH) ---
  static async verifyNotification(notificationBody: any) {
    // Pastikan mengakses method .notification()
    return await this.snap.transaction.notification(notificationBody);
  }
}