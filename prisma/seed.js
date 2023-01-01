const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const test_admin_user = await prisma.user.create({
    data: {
      email: "testuser@email.com",
      name: "Test User",
      role: "ADMIN",
    },
  });

  console.log({ test_admin_user });
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
