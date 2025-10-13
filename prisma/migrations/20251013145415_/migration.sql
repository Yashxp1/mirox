/*
  Warnings:

  - The primary key for the `Doc` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `docId` on the `Doc` table. All the data in the column will be lost.
  - The primary key for the `Workspace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `workspaceId` on the `Workspace` table. All the data in the column will be lost.
  - The primary key for the `WorkspaceMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Doc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `WorkspaceMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Doc" DROP CONSTRAINT "Doc_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DocumentShare" DROP CONSTRAINT "DocumentShare_docId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_workspaceId_fkey";

-- DropIndex
DROP INDEX "public"."Doc_docId_key";

-- DropIndex
DROP INDEX "public"."Workspace_workspaceId_key";

-- AlterTable
ALTER TABLE "public"."Doc" DROP CONSTRAINT "Doc_pkey",
DROP COLUMN "docId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "workspaceId" SET DATA TYPE TEXT;
DROP SEQUENCE "Doc_id_seq";

-- AlterTable
ALTER TABLE "public"."DocumentShare" ALTER COLUMN "docId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Workspace" DROP CONSTRAINT "Workspace_pkey",
DROP COLUMN "workspaceId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Workspace_id_seq";

-- AlterTable
ALTER TABLE "public"."WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "workspaceId" SET DATA TYPE TEXT;
DROP SEQUENCE "WorkspaceMember_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Doc_id_key" ON "public"."Doc"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_id_key" ON "public"."Workspace"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_id_key" ON "public"."WorkspaceMember"("id");

-- AddForeignKey
ALTER TABLE "public"."WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doc" ADD CONSTRAINT "Doc_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DocumentShare" ADD CONSTRAINT "DocumentShare_docId_fkey" FOREIGN KEY ("docId") REFERENCES "public"."Doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;
