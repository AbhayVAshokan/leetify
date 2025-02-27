/*
  Warnings:

  - You are about to drop the column `leetCodeUserName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" RENAME COLUMN "leetCodeUserName" to "username";

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
