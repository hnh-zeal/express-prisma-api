import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  await prisma.admin.upsert({
    where: { loginId: 'alice@prisma.io' },
    update: {},
    create: {
      loginId: 'superadmin',
      name: 'Super Admin',
      password: bcrypt.hashSync('@dminP@ssword', 10),
      isActive: true
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
