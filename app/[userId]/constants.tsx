"use client";

export type Problem = {
  id: string;
  isFavorite: boolean;
  title: string;
  url: string;
  difficulty: string;
  createdAt: Date;
  userId: string;
  submittedAt: Date;
};

export type User = {
  id: string;
  name: string;
  avatar: string | null;
  leetCodeUserName: string;
  createdAt: Date;
};
