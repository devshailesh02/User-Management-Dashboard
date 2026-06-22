import prisma from "../config/prisma.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";

// ------------- registerUser service----------------//
export const registerUser = async (dto) => {
  try {
    const { name, email, password } = dto;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: {
          connect: {
            name: "user",
          },
        },
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// ------------- loginUser service----------------//
export const loginUser = async (dto) => {
  try {
    const { email, password } = dto;
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
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
