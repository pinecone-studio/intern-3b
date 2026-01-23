/*
  Warnings:

  - The values [CHECK,MIXED] on the enum `AttendanceType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `teamWork` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeamWorkLevel" AS ENUM ('ALWAYS', 'OFTEN', 'RARELY');

-- AlterEnum
BEGIN;
CREATE TYPE "AttendanceType_new" AS ENUM ('CALL', 'ONLINE', 'MIX', 'NONE');
ALTER TABLE "Review" ALTER COLUMN "attendance" TYPE "AttendanceType_new" USING ("attendance"::text::"AttendanceType_new");
ALTER TYPE "AttendanceType" RENAME TO "AttendanceType_old";
ALTER TYPE "AttendanceType_new" RENAME TO "AttendanceType";
DROP TYPE "public"."AttendanceType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ExamFormat" ADD VALUE 'ONLINE';
ALTER TYPE "ExamFormat" ADD VALUE 'PAPER';
ALTER TYPE "ExamFormat" ADD VALUE 'SPEAK';

-- AlterTable
ALTER TABLE "ExamInfo" ALTER COLUMN "costPoints" SET DEFAULT 10;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "teamWork" "TeamWorkLevel" NOT NULL;
