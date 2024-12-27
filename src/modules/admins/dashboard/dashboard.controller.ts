import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import dashboardService from './dashboard.service';

import responseMessage from '@/utils/response-message';

const dashboardController = {
  dashboard: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await dashboardService.dashboard();
      responseMessage(res, StatusCodes.OK, data.message, data.data);
    } catch (error) {
      next(error);
    }
  }
};

export default dashboardController;
