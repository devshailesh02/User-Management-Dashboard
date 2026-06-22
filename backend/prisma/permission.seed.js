// prisma/permission.seed.js

import prisma from "../src/config/prisma.js";

async function main() {
  await prisma.permission.createMany({
    data: [
      // Company Permissions
      {
        module: "company",
        action: "create",
        description: "Create company",
      },
      {
        module: "company",
        action: "read",
        description: "View company",
      },
      {
        module: "company",
        action: "update",
        description: "Update company",
      },
      {
        module: "company",
        action: "delete",
        description: "Delete company",
      },

      // Employee Permissions
      {
        module: "employee",
        action: "create",
        description: "Create employee",
      },
      {
        module: "employee",
        action: "read",
        description: "View employee",
      },
      {
        module: "employee",
        action: "update",
        description: "Update employee",
      },
      {
        module: "employee",
        action: "delete",
        description: "Delete employee",
      },

      // Role Permissions
      {
        module: "role",
        action: "create",
        description: "Create role",
      },
      {
        module: "role",
        action: "read",
        description: "View role",
      },
      {
        module: "role",
        action: "update",
        description: "Update role",
      },
      {
        module: "role",
        action: "delete",
        description: "Delete role",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Permissions seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
