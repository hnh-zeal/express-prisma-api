import { prisma } from '@/config';

const dashboardService = {
  dashboard: async () => {
    const data = await prisma.admin.findMany({});

    return {
      message: 'Fetched Dashboard Count Successfully.',
      data
    };
  }
};

export default dashboardService;
