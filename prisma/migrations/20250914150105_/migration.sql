/*
  Warnings:

  - You are about to drop the column `startdata` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "startdata",
ADD COLUMN     "startdate" TIMESTAMP(3);
