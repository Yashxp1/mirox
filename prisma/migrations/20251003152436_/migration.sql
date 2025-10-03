/*
  Warnings:

  - Made the column `workspaceId` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Project" ALTER COLUMN "workspaceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "projectId" SET NOT NULL;
