/*
  Warnings:

  - You are about to drop the column `publicId` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `WorkSpace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publicId` on the `WorkSpace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `WorkSpace` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_workspaceId_fkey";

-- DropIndex
DROP INDEX "public"."Project_publicId_key";

-- DropIndex
DROP INDEX "public"."WorkSpace_publicId_key";

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "publicId",
ALTER COLUMN "workspaceId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."WorkSpace" DROP CONSTRAINT "WorkSpace_pkey",
DROP COLUMN "publicId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "WorkSpace_id_seq";

-- AlterTable
ALTER TABLE "public"."WorkspaceMember" ALTER COLUMN "workspaceId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "WorkSpace_id_key" ON "public"."WorkSpace"("id");

-- AddForeignKey
ALTER TABLE "public"."WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."WorkSpace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."WorkSpace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
