import { Problem, Topic, User } from "@prisma/client";

export type FavoriteProblem = Problem & { users: User[] };

export type ProblemWithTopics = Problem & { topics: Topic[] };
