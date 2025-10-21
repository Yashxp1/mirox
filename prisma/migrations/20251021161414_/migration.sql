-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_workspaceId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "workspaceId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."Workspace"("wsId") ON DELETE SET NULL ON UPDATE CASCADE;
