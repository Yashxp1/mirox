/*
  Warnings:

  - You are about to drop the column `userId` on the `WorkSpace` table. All the data in the column will be lost.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."WorkSpace" DROP CONSTRAINT "WorkSpace_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."WorkSpace" DROP COLUMN "userId";
