import prisma from "../config/prisma.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";

export const registerCompany = async (dto) => {
  try {
    const { name, email, password } = dto;
    const hashed = await hashPassword(password);
    const user = await prisma.company.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginCompany = async (dto) => {
  try {
    const { email, password } = dto;
    const user = await prisma.company.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }
    const token = generateToken(user);
    const { password: _, ...safeUser } = user;

    return { token, user: safeUser };
  } catch (error) {
    // ✅ Known error (already has status)
    if (error.status) {
      throw error;
    }
    // ❌ Unknown error → convert to 500
    const err = new Error("Internal Server Error");
    err.status = 500;
    throw err;
  }
};
