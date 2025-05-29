/* eslint-disable no-undef */
import nodemailer from 'nodemailer'
import type { BaseBooking } from '../utils/types/bookingTypes'

export const sendBookingEmail = async ({ userEmail, bookingType, data }: BaseBooking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let subject = '';
  let htmlContent = '';

  if (bookingType === 'tour') {
    subject = '🎉 Xác nhận đặt tour thành công';

    htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50;">✅ Bạn đã đặt tour thành công!</h2>
          <p style="font-size: 16px; color: #555;">
            Xin chào quý khách,<br>
            Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi. Dưới đây là thông tin chi tiết về đơn đặt tour của bạn:
          </p>

          <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">🧭 Tên tour:</td>
              <td style="padding: 8px;">${data.title}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">📅 Ngày khởi hành:</td>
              <td style="padding: 8px;">${new Date(data.start_date).toLocaleDateString('vi-VN')}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">👥 Số người:</td>
              <td style="padding: 8px;">${data.number_of_people}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">💰 Tổng tiền:</td>
              <td style="padding: 8px; color: #e74c3c;"><strong>${data.total_price.toLocaleString('vi-VN')} VNĐ</strong></td>
            </tr>
          </table>

          <p style="margin-top: 30px; font-size: 14px; color: #888;">
            Nếu bạn có bất kỳ thắc mắc hoặc muốn chỉnh sửa thông tin đặt tour, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi.
          </p>

          <p style="font-size: 14px; color: #888;">
            Trân trọng,<br>
            <strong>Đội ngũ TourBooking</strong>
          </p>

          <hr style="margin: 30px 0;">
          <p style="font-size: 12px; color: #bbb; text-align: center;">
            Đây là email tự động. Vui lòng không trả lời trực tiếp email này.
          </p>
        </div>
      </div>
    `;
  }

  await transporter.sendMail({
    from: `"TourBooking" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject,
    html: htmlContent
  });
};
