// prisma/seed.js

import prisma from "../src/config/prisma.js";

async function main() {
  await prisma.role.createMany({
    data: [{ name: "superadmin" }, { name: "admin" }, { name: "user" }],
    skipDuplicates: true,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
