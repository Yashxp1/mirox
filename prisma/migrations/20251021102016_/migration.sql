/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[wsId]` on the table `WorkSpace` will be added. If there are existing duplicate values, this will fail.
  - The required column `wsId` was added to the `WorkSpace` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."WorkSpace" ADD COLUMN     "wsId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Project";

-- CreateIndex
CREATE UNIQUE INDEX "WorkSpace_wsId_key" ON "public"."WorkSpace"("wsId");
