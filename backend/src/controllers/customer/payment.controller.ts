import { Request, Response } from "express";
import { PaymentService } from "../../core/services/payment.service";
import prisma from "../../config/prisma";
import { PaymentStatus, OrderStatus } from "@prisma/client";

export const handleMidtransNotification = async (req: Request, res: Response) => {
  try {
    const statusResponse = await PaymentService.verifyNotification(req.body);
    
    const orderIdStr = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    // Parse ID Order asli: "ORDER-123-timestamp" -> 123
    const realOrderId = parseInt(orderIdStr.split("-")[1]);

    let newPaymentStatus: PaymentStatus = PaymentStatus.UNPAID;

    if (transactionStatus == 'capture') {
      if (fraudStatus == 'challenge') {
        // Handle challenge if needed
      } else if (fraudStatus == 'accept') {
        newPaymentStatus = PaymentStatus.PAID;
      }
    } else if (transactionStatus == 'settlement') {
      newPaymentStatus = PaymentStatus.PAID;
    } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
      newPaymentStatus = PaymentStatus.UNPAID;
    }

    if (newPaymentStatus === PaymentStatus.PAID) {
      // Update status pembayaran & status pesanan jadi PREPARING (otomatis masuk dapur)
      const updatedOrder = await prisma.order.update({
        where: { id: realOrderId },
        data: { 
          paymentStatus: PaymentStatus.PAID,
          status: OrderStatus.PREPARING 
        }
      });
      
      // Notifikasi Realtime ke Admin/Dapur
      const io = req.app.get("io");
      io.emit("payment-success", { 
        orderId: realOrderId, 
        message: `Pembayaran Order #${realOrderId} berhasil!` 
      });
      io.emit("order-status-updated", updatedOrder);
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Payment Notification Error:", error);
    return res.status(500).send("Error processing notification");
  }
};