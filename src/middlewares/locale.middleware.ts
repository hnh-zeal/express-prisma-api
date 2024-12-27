import { Request, Response, NextFunction } from 'express';
import { setLocale } from '@/utils/localStore';

const localeMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const locale = (req.headers['accept-language'] as string) || 'en'; // Default 'en'
  setLocale(locale); // Update global locale
  req.locale = locale;
  next();
};

export default localeMiddleware;
