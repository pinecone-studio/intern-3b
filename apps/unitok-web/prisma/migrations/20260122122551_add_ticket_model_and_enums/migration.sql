-- CreateEnum
CREATE TYPE "TicketAction" AS ENUM ('REVIEW_CREATED', 'EXAM_INFO_CREATED', 'EXAM_INFO_VIEWED', 'REVIEW_LIKED', 'EXAM_INFO_LIKED');

-- CreateTable
CREATE TABLE "TicketTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "action" "TicketAction" NOT NULL,
    "reviewId" TEXT,
    "examInfoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TicketTransaction_userId_createdAt_idx" ON "TicketTransaction"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "TicketTransaction" ADD CONSTRAINT "TicketTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
