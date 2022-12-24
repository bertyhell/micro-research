/*
  Warnings:

  - You are about to drop the column `count` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "count";

-- CreateTable
CREATE TABLE "Response" (
    "projectId" TEXT NOT NULL,
    "firstAnswerId" TEXT NOT NULL,
    "secondAnswerId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("firstAnswerId","secondAnswerId")
);

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_firstAnswerId_fkey" FOREIGN KEY ("firstAnswerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_secondAnswerId_fkey" FOREIGN KEY ("secondAnswerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
