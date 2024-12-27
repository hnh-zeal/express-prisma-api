import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import profileService from './profile.service';

import responseMessage from '@/utils/response-message';

const settingController = {
  getUserProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await profileService.getUserProfile(req);
      responseMessage(res, StatusCodes.OK, data.message, data.data);
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await profileService.updateProfile(req);
      responseMessage(res, StatusCodes.OK, data.message, data.data);
    } catch (error) {
      next(error);
    }
  }
};

export default settingController;
