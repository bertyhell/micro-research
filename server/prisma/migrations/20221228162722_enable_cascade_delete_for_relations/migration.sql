-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_firstAnswerId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_secondAnswerId_fkey";

-- DropForeignKey
ALTER TABLE "TagLink" DROP CONSTRAINT "TagLink_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TagLink" DROP CONSTRAINT "TagLink_tagId_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_firstAnswerId_fkey" FOREIGN KEY ("firstAnswerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_secondAnswerId_fkey" FOREIGN KEY ("secondAnswerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagLink" ADD CONSTRAINT "TagLink_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagLink" ADD CONSTRAINT "TagLink_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
