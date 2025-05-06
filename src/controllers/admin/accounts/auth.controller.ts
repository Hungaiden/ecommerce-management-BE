import { Request, Response } from "express";
import * as accountService from "../../../services/admin/accounts/auth.service";
import * as authService from "../../../services/admin/accounts/auth.service";
import * as paramsTypes from "../../../utils/types/paramsTypes";
import { myJwtPayload } from "../../../utils/types/jwtTypes";
import {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from "../../../utils/types/ResponseTypes";
import ms from 'ms'
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, userInfo } = await authService.login(email, password);

    res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: ms('14 days')
        })
    
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: ms('14 days')
        })
    const response: ResponseDetailSuccess<{
      accessToken: string;
      refreshToken: string;
      userInfo: myJwtPayload;
    }> = {
      code: 200,
      message: "Đăng nhập thành công",
      data: {
        accessToken,
        refreshToken,
        userInfo,
      },
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 400,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    };
    res.status(400).json(response)
  }
};

export const logout = async (req: Request, res: Response) => {

}