import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import randomstring from 'randomstring';

import { config, prisma } from '@/config';

const profileService = {
  loginOrRegister: async (req: Request, res: Response) => {
    const { deviceId } = req.body;

    let user = await prisma.user.findFirst({
      where: { deviceId, isActive: true }
    });

    if (!user) {
      user = await prisma.$primary().user.create({
        data: {
          deviceId,
          name: randomstring.generate(7),
          isActive: true
        }
      });
    }

    const accessToken = await profileService.signToken({ id: user.id });

    return {
      message: res.__('SUCCESS_LOGIN'),
      data: { user, accessToken }
    };
  },

  signToken: async (payload: JwtPayload) => {
    const token = jwt.sign(
      {
        ...payload
        // iat: new Date()
      },
      config.USER_JWT_SECRET_KEY as string
      // { expiresIn: '1d' }
    );

    return token;
  }
};

export default profileService;
