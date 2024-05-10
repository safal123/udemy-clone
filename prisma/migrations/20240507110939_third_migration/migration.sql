-- DropIndex
DROP INDEX "user_progress_userId_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isTeacher" BOOLEAN NOT NULL DEFAULT false;
