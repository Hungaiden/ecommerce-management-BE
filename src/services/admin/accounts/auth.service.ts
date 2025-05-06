import { Account } from "../../../models/accounts/account.model";
import { CreateAccountDto } from "../../../dto/accounts/create.account.dto";
import { UpdateAccountDto } from "../../../dto/accounts/update.account.dto";
import * as paramsTypes from "../../../utils/types/paramsTypes";
import { JwtPayload } from "jsonwebtoken";
import { JwtProvider } from "../../../providers/JwtProvider";
import { myJwtPayload } from '../../../utils/types/jwtTypes'

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Số round để tạo salt

export const login = async (email: string, password: string) => {
  try {
      // Tìm tài khoản theo email
    const account = await Account.findOne({ 
      email : email,
      deleted: false
    });
    if (!account) {
      throw new Error("Tài khoản không tồn tại!"); 
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      throw new Error("Mật khẩu không đúng!"); 
    }
    
    if (account.deleted) {
      throw new Error("Tài khoản đã bị xóa!");
      return 
    }
    const userInfo : myJwtPayload = {
      userId: account._id.toString(),
      email: account.email,
      role: account.role_id,
      fullName: account.fullName,
    }

    // Tạo access token và refresh token
    const accessToken = await JwtProvider.generateToken(
      userInfo,
      process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
      '1h'
    )

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
      '14 days'
    )
    return { accessToken, refreshToken, userInfo }
  }
  catch (error) {
    throw new Error(error.message || "Đăng nhập thất bại!");
  }
}
