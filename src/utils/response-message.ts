import { Response } from 'express';

interface ResponseMessage {
  isSuccess: boolean;
  message: string;
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalCounts?: number;
  data?: any;
}

const responseMessage = (
  res: Response,
  statusCode: number = 200, // Default status code is 200
  message: string = '',
  result: any = undefined,
  currentPage?: number,
  totalPages?: number,
  pageSize?: number,
  totalCounts?: number
): void => {
  const response: ResponseMessage = {
    isSuccess: true,
    message: message
  };

  if (currentPage !== undefined) {
    response.currentPage = currentPage;
  }

  if (totalPages !== undefined) {
    response.totalPages = totalPages;
  }

  if (pageSize !== undefined) {
    response.itemsPerPage = pageSize;
  }

  if (totalCounts !== undefined) {
    response.totalCounts = totalCounts;
  }

  if (result !== undefined) {
    response.data = result;
  }

  res.status(statusCode).json(response);
};

export default responseMessage;
