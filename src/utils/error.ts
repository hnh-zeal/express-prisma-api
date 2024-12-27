import { NextFunction, Request, Response } from 'express';
import { errorChannel } from './telegram-bot';

const errorMiddleware = async (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const errorMessage = err.message.startsWith('Error: ') ? err.message.slice(7) : err.message;

  const response = {
    isSuccess: false,
    message: errorMessage
  };

  // For error handing;
  await errorChannel(JSON.stringify(response));

  if (err.statusCode) {
    res.status(err.statusCode).json(response);
  } else {
    res.status(412).json(response);
  }
};

export default errorMiddleware;
