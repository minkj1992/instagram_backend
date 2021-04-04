/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[tag]` on the table `Hashtag`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.tag_unique" ON "Hashtag"("tag");
