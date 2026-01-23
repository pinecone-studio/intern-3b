/*
  Warnings:

  - You are about to drop the column `costPoints` on the `ExamInfo` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,courseId]` on the table `ExamInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,courseId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Made the column `courseId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_professorId_fkey";

-- DropIndex
DROP INDEX "Review_professorId_idx";

-- DropIndex
DROP INDEX "Review_userId_professorId_courseId_key";

-- AlterTable
ALTER TABLE "ExamInfo" DROP COLUMN "costPoints",
ADD COLUMN     "costTickets" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "professorId",
ALTER COLUMN "courseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "points",
ADD COLUMN     "tickets" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewId" TEXT,
    "examInfoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_reviewId_key" ON "Like"("userId", "reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_examInfoId_key" ON "Like"("userId", "examInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamInfo_userId_courseId_key" ON "ExamInfo"("userId", "courseId");

-- CreateIndex
CREATE INDEX "Review_courseId_idx" ON "Review"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_courseId_key" ON "Review"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_examInfoId_fkey" FOREIGN KEY ("examInfoId") REFERENCES "ExamInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
