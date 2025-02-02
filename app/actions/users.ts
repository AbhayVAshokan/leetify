"use server";

import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export const fetchUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};
