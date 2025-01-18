"use server";
import { db } from "@/lib/db";

export const getUserByEmailorPhone = async (email: string, phone?: string) => {
  try {
    if (email && phone) {
      const user = await db.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      return user;
    } else {
      const user = await db.user.findUnique({ where: { email } });
      return user;
    }
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByPhone = async (phone: string) => {
  try {
    const user = await db.user.findUnique({ where: { phone } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return null;
  }
};
