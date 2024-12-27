import { Admin, User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      admin?: Admin;
      user?: User;
    }
  }
}
