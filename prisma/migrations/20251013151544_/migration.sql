/*
  Warnings:

  - The `id` column on the `Doc` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `DocumentShare` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `DocumentShare` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `docId` on the `DocumentShare` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."DocumentShare" DROP CONSTRAINT "DocumentShare_docId_fkey";

-- AlterTable
ALTER TABLE "public"."Doc" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "public"."DocumentShare" DROP CONSTRAINT "DocumentShare_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "docId",
ADD COLUMN     "docId" INTEGER NOT NULL,
ADD CONSTRAINT "DocumentShare_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Doc_id_key" ON "public"."Doc"("id");

-- CreateIndex
CREATE INDEX "DocumentShare_docId_idx" ON "public"."DocumentShare"("docId");

-- AddForeignKey
ALTER TABLE "public"."DocumentShare" ADD CONSTRAINT "DocumentShare_docId_fkey" FOREIGN KEY ("docId") REFERENCES "public"."Doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;
