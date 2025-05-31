import { Request, Response, NextFunction } from "express";
import moment from "moment";
import crypto from "crypto";
import { sortObject } from "../../utils/sortObject";
import qs from "qs";
import { TourBooking } from "../../models/tours/tourBooking.model";
interface CreatePaymentRequestBody {
  bookingId: string;
  amount: number;
  bankCode?: string;
  language?: string;
}
export const createPaymentUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;
    console.log('📌 bookingId:', bookingId);

    if (!bookingId || typeof bookingId !== 'string') {
      res.status(400).json({ message: 'Missing or invalid bookingId' });
      return;
    }

    const booking = await TourBooking.findById(bookingId);

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (booking.payment_status === 'paid') {
      res.status(400).json({ message: 'Booking already paid' });
      return;
    }

    const amount = booking.total_price;
    const ipAddr = '127.0.0.1';
    

    const tmnCode = process.env.VNP_TMN_CODE!;
    const secretKey = process.env.VNP_HASH_SECRET!;
    const vnpUrl = process.env.VNP_URL!;
    const returnUrl = process.env.VNP_RETURN_URL!;

    const createDate = moment().format('YYYYMMDDHHmmss');
    const orderInfo = `Thanh toan booking ${bookingId}`;

    const vnp_Params: { [key: string]: string } = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: bookingId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'other',
      vnp_Amount: (amount * 100).toString(), // VNPAY yêu cầu x100
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr as string,
      vnp_CreateDate: createDate,
    };

    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });

    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    sortedParams.vnp_SecureHash = signed;

    const paymentUrl = `${vnpUrl}?${qs.stringify(sortedParams, { encode: false })}`;

    console.log('🔍 SignData:', signData);
    console.log('✅ SecureHash:', signed);

    // Save to DB (optional for debug/reference)
    booking.payment_url = paymentUrl;
    await booking.save();

    res.status(200).json({
      message: 'Successfully created payment URL',
      paymentUrl,
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
export const vnpayReturn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vnp_Params = { ...req.query };
    const secureHash = vnp_Params["vnp_SecureHash"] as string;
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    // Get config from env
    const secretKey = process.env.VNP_HASH_SECRET;
    if (!secretKey) {
      throw new Error("Missing VNP_HASH_SECRET");
    }

    // Sort params and create signData
    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    console.log("signData:", signData);
    console.log("signed:", signed);
    console.log("secureHash from VNPay:", secureHash);

    if (secureHash !== signed) {
      res.status(400).json({ message: "Invalid secure hash" });
      return;
    }

    // Check payment result
    const responseCode = vnp_Params["vnp_ResponseCode"];
    const bookingId = vnp_Params["vnp_TxnRef"];
    let update;
    if (responseCode === "00") {
      // Success
      update = {
        payment_status: "paid",
        status: "confirmed",
        transaction_code: vnp_Params["vnp_TransactionNo"],
        payment_time: new Date(),
        vnp_response_code: responseCode,
      };
    } else {
      // Failed
      update = {
        payment_status: "failed",
        status: "cancelled",
        vnp_response_code: responseCode,
      };
    }
    // Update booking
    const { TourBooking } = require("../../models/tours/tourBooking.model");
    await TourBooking.findOneAndUpdate({ _id: bookingId }, update);
    // Redirect or respond
    res.status(200).json({
      message:
        responseCode === "00" ? "Thanh toán thành công" : "Thanh toán thất bại",
      bookingId,
      responseCode,
    });
  } catch (error) {
    next(error);
  }
};
