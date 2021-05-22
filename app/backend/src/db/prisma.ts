import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function createRoles() {
  const admin = await prisma.role.findUnique({
    where: {
      name: "admin",
    },
  });

  if (!admin) {
    await prisma.role.create({
      data: {
        name: "admin",
      },
    });
  }

  const manager = await prisma.role.findUnique({
    where: {
      name: "manager",
    },
  });

  if (!manager) {
    await prisma.role.create({
      data: {
        name: "manager",
      },
    });
  }
}

async function createAdminUser() {
  const email = "admin@admin.com";
  const password = "admin";

  const admin = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (admin) {
    return;
  }

  await prisma.user.create({
    data: {
      email,
      username: "admin",
      password: await bcrypt.hash(password, 10),
      session: uuid(),
      role: {
        connectOrCreate: {
          where: {
            name: "admin",
          },
          create: {
            name: "admin",
          },
        },
      },
      establishment: {
        create: {
          name: "admin's establishment",
        },
      },
    },
  });
}

export async function seedDb() {
  await createRoles();
  await createAdminUser();
}

export const prisma = new PrismaClient();
