import { Admin, User } from '@prisma/client';
import { Request } from 'express';

export type IAdminRequest = Request & {
  admin?: Admin;
};

export type IUserRequest = Request & {
  user?: User;
};
