import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { config, prisma } from '@/config';
import { UserPayload } from '@/types';
import { IUserRequest } from '@/types/common';
import { throwError } from '@/utils/throwError';

const userAuthMiddleware = async (req: IUserRequest, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw throwError(401, 'Unauthorized: No token provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw throwError(401, 'Unauthorized: Invalid token format');
    }

    const payload = verify(token, `${config.USER_JWT_SECRET_KEY}`) as UserPayload;

    if (!payload) {
      throw throwError(401, 'Please login again');
    }

    const user = await prisma.user.findUniqueOrThrow({ where: { id: payload?.id } });
    if (!user.isActive) {
      throw throwError(403, 'Your account has been deactivated.');
    }
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default userAuthMiddleware;
