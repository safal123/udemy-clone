-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('UPLOADED', 'PROCESSING', 'READY', 'FAILED');

-- CreateEnum
CREATE TYPE "MediaQuality" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storageId" TEXT,
    "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "size" INTEGER,
    "length" INTEGER,
    "mimeType" TEXT,
    "url" TEXT,
    "thumbnailUrl" TEXT,
    "processedUrl" TEXT,
    "originalUrl" TEXT,
    "status" "MediaStatus" NOT NULL DEFAULT 'UPLOADED',
    "quality" "MediaQuality",
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "courseId" TEXT,
    "chapterId" TEXT,
    "createdBy" TEXT NOT NULL,
    "approvedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_storageId_key" ON "media"("storageId");

-- CreateIndex
CREATE INDEX "media_courseId_idx" ON "media"("courseId");

-- CreateIndex
CREATE INDEX "media_chapterId_idx" ON "media"("chapterId");

-- CreateIndex
CREATE INDEX "media_createdBy_idx" ON "media"("createdBy");

-- CreateIndex
CREATE INDEX "media_approvedBy_idx" ON "media"("approvedBy");
