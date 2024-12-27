import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { config, prisma } from '@/config';
import { AdminPayload } from '@/types';
import { IAdminRequest } from '@/types/common';
import { throwError } from '@/utils/throwError';

const adminAuthMiddleware = async (req: IAdminRequest, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw throwError(401, 'Unauthorized: No token provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw throwError(401, 'Unauthorized: Invalid token format');
    }

    const payload = verify(token, `${config.ADMIN_JWT_SECRET_KEY}`) as AdminPayload;

    if (!payload) {
      throw throwError(401, 'Login Again');
    }

    const admin = await prisma.admin.findUniqueOrThrow({ where: { id: payload?.id } });

    if (!admin.isActive) {
      throw throwError(403, 'Your account has been deactivated.');
    }

    req.admin = admin;

    next();
  } catch (error) {
    next(error);
  }
};

export default adminAuthMiddleware;
