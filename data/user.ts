import { db } from "@/lib/db";

export const getUserByEmailorPhone = async (email: string, phone?: string) => {
  try {

    if (email && phone) {

      const user = await db.user.findUnique({
        where: {
          OR: [{ email: email }, { phone: phone }],
        },
      } as any);

      return user

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
