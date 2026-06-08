import prisma from "../src/config/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("SuperAdmin@123", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "superadmin@example.com",
      password,

      role: {
        connect: {
          name: "superadmin",
        },
      },
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
