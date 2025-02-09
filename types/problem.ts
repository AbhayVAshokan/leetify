import { Problem, User } from "@prisma/client";

export type FavoriteProblem = Problem & { users: User[] };
