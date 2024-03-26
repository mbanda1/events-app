-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "assignedUserId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
