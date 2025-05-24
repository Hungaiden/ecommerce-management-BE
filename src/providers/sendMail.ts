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

  // Soạn nội dung email theo loại booking
  let subject = '';
  let htmlContent = '';

  if (bookingType === 'tour') {
    subject = 'Xác nhận đặt Tour thành công';
    htmlContent = `
      <h3>Bạn đã đặt tour thành công!</h3>
      <p><strong>Tên tour:</strong> ${data.title}</p>
      <p><strong>Ngày khởi hành:</strong> ${data.start_date}</p>
      <p><strong>Số lượng:</strong> ${data.number_of_people}</p>
      <p><strong>Tổng tiền:</strong> ${data.total_price} VNĐ</p>
    `;
  } else if (bookingType === 'hotel') {
    subject = 'Xác nhận đặt Khách sạn thành công';
    htmlContent = `
      <h3>Bạn đã đặt phòng khách sạn thành công!</h3>
      <p><strong>Khách sạn:</strong> ${data.name}</p>
      <p><strong>Nhận phòng:</strong> ${data.check_in}</p>
      <p><strong>Trả phòng:</strong> ${data.check_out}</p>
      <p><strong>Tổng tiền:</strong> ${data.total_price} VNĐ</p>
    `;
  } else if (bookingType === 'flight') {
    subject = 'Xác nhận đặt Vé máy bay thành công';
    htmlContent = `
      <h3>Bạn đã đặt vé máy bay thành công!</h3>
      <p><strong>Chuyến bay:</strong> ${data.flight_number}</p>
      <p><strong>Khởi hành:</strong> ${data.departure_datetime}</p>
      <p><strong>Hạ cánh:</strong> ${data.arrival_datetime}</p>
      <p><strong>Tổng tiền:</strong> ${data.total_price} VNĐ</p>
    `;
  }

  await transporter.sendMail({
    from: `"TourBooking" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject,
    html: htmlContent
  });
};
