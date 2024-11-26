-- CreateEnum
CREATE TYPE "REQUEST_STATUS" AS ENUM ('REQUESTED_BY_USER', 'REQUESTED_BY_ADMIN', 'PENDING', 'CANCELLED_BY_USER', 'APPROVED_BY_ADMIN', 'REJECTED_BY_ADMIN');

-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "videoStorageId" TEXT;

-- CreateTable
CREATE TABLE "teacher_access_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "REQUEST_STATUS" NOT NULL DEFAULT 'REQUESTED_BY_USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_access_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "teacher_access_requests_userId_idx" ON "teacher_access_requests"("userId");

-- CreateIndex
CREATE INDEX "courses_userId_idx" ON "courses"("userId");
