import { Request, Response, NextFunction } from "express";
import moment from "moment";
import crypto from "crypto";
import { sortObject } from "../../utils/sortObject";
import qs from "qs";

interface CreatePaymentRequestBody {
  bookingId: string;
  amount: number;
  bankCode?: string;
  language?: string;
}
export const createPaymentUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const orderId = moment(date).format("DDHHmmss");

    // Lấy bookingId từ params
    const bookingId = req.params.bookingId;
    if (!bookingId) {
      res.status(400).json({ message: "Missing bookingId in params" });
      return;
    }
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      req.connection.remoteAddress ||
      "";

    const tmnCode = process.env.VNP_TMN_CODE || "";
    const secretKey = process.env.VNP_HASH_SECRET || "";
    let vnpUrl = process.env.VNP_URL || "";
    const returnUrl = process.env.VNP_RETURN_URL || "";

    const amount = Number(req.body.amount); // e.g. 100000
    const bankCode = req.body.bankCode as string;
    const locale = req.body.language || "vn";

    const vnp_Params: { [key: string]: string } = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: "VND",
      vnp_TxnRef: bookingId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: (amount * 100).toString(),
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr.toString(),
      vnp_CreateDate: createDate,
    };

    if (bankCode) {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    // 🔒 Không thêm SecureHash vào đây
    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    // 🔐 Bây giờ mới thêm SecureHash
    sortedParams["vnp_SecureHash"] = signed;

    // Tạo URL
    vnpUrl += "?" + qs.stringify(sortedParams, { encode: false });

    console.log("signData:", signData);
    console.log("signed:", signed);
    console.log("secureHash from VNPay:", sortedParams["vnp_SecureHash"]);

    res.status(200).json({
      code: "00",
      message: "success",
      paymentUrl: vnpUrl,
    });
  } catch (error) {
    next(error);
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
