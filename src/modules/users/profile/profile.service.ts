import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import randomstring from 'randomstring';

import { config, prisma } from '@/config';
import { IUserRequest } from '@/types/common';

const profileService = {
  getUserProfile: async (req: Request) => {
    const user = (req as any).user;

    const profile = await prisma.user.findUnique({
      where: { id: user.id }
    });

    return {
      message: `User profile fetched successfully`,
      data: profile
    };
  },

  updateProfile: async (req: IUserRequest) => {
    const user = req.user;
    const { fullName, photoUrl } = req.body;

    const data = await prisma.$primary().user.update({
      data: {
        ...(fullName && { fullName }),
        ...(photoUrl && { photoUrl })
      },
      where: { id: user.id }
    });

    return {
      message: 'User profile updated successfully',
      data
    };
  }
};

export default profileService;
