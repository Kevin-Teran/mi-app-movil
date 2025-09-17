import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.user.deleteMany();
  console.log('Deleted existing users.');
  await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: 'admin123',
      name: 'Admin User',
      role: UserRole.admin,
    },
  });

  await prisma.user.create({
    data: {
      email: 'psy@demo.com',
      password: 'psy123',
      name: 'Dr. Smith',
      role: UserRole.psychologist,
    },
  });

  await prisma.user.create({
    data: {
      email: 'patient@demo.com',
      password: 'patient123',
      name: 'John Doe',
      role: UserRole.patient,
    },
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });