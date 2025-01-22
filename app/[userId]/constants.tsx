"use client";

export type Problem = {
  id: string;
  isFavorite: boolean;
  title: string;
  url: string;
  difficulty: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  avatar?: string;
};
