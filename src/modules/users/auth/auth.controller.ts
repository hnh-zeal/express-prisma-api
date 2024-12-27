import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import authService from './auth.service';

import responseMessage from '@/utils/response-message';

const authController = {
  loginOrRegister: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await authService.loginOrRegister(req, res);
      responseMessage(res, StatusCodes.OK, data.message, data.data);
    } catch (error) {
      next(error);
    }
  }
};

export default authController;
