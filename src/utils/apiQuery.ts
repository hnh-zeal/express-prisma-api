import { PrismaClient } from '@prisma/client';

import { throwError } from './throwError';

const prisma = new PrismaClient();

export const fetchData = async ({ model, page, pageSize, sort, where, include, select, ordering }: any) => {
  try {
    const orderBy = ordering
      ? ordering
      : {
          id: sort
        };

    const data = await (prisma as any)[model].findMany({
      where,
      include,
      select,
      skip: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
      take: parseInt(pageSize, 10),
      orderBy
    });

    const totalCount = await (prisma as any)[model].count({
      where
    });

    const totalPage = Math.ceil(totalCount / parseInt(pageSize, 10));

    return {
      currentPage: parseInt(page, 10),
      totalPage,
      pageSize: parseInt(pageSize, 10),
      totalCount,
      data
    };
  } catch (error: any) {
    console.error(error);
    throw throwError(400, error.message);
  }
};
