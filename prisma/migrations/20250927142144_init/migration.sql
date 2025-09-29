/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `WorkSpace` will be added. If there are existing duplicate values, this will fail.
  - The required column `publicId` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `WorkSpace` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "public"."WorkspaceRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER');

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "assigneeId" TEXT;

-- AlterTable
ALTER TABLE "public"."WorkSpace" ADD COLUMN     "publicId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."WorkspaceMember" (
    "id" SERIAL NOT NULL,
    "role" "public"."WorkspaceRole" NOT NULL DEFAULT 'MEMBER',
    "userId" TEXT NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "invitedBy" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_userId_workspaceId_key" ON "public"."WorkspaceMember"("userId", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_publicId_key" ON "public"."Project"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkSpace_publicId_key" ON "public"."WorkSpace"("publicId");

-- AddForeignKey
ALTER TABLE "public"."WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."WorkSpace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
