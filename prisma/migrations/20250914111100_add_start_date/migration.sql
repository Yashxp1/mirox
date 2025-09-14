/*
  Warnings:

  - You are about to drop the column `startdata` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "startdata",
ADD COLUMN     "startdate" TIMESTAMP(3);
