import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { config, prisma } from '@/config';
import { throwError } from '@/utils/throwError';

const authService = {
  signToken: async (payload: JwtPayload) => {
    const token = jwt.sign(
      {
        ...payload
        // iat: new Date()
      },
      config.ADMIN_JWT_SECRET_KEY as string
      // { expiresIn: '1d' }
    );

    return token;
  },

  login: async (req: Request) => {
    const { loginId, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { loginId }
    });

    if (!admin) {
      throw throwError(404, 'Admin not found with this login id.');
    }

    if (!admin.isActive) {
      throw throwError(401, 'Admin is deactivated.');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (password && !passwordMatch) {
      throw throwError(400, 'Invalid credentials');
    }
    // Sign JWT Token
    const accessToken = await authService.signToken({ id: admin.id });

    return {
      message: 'Admin logged in successfully.',
      data: { admin, accessToken }
    };
  }
};

export default authService;
