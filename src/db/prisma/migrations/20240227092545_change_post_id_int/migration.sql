/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `postId` on the `LikedPost` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `region` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LikedPost" DROP CONSTRAINT "LikedPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "Region" DROP CONSTRAINT "Region_postId_fkey";

-- AlterTable
ALTER TABLE "LikedPost" DROP COLUMN "postId",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ADD COLUMN     "region" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Region";

-- CreateIndex
CREATE UNIQUE INDEX "LikedPost_userId_postId_key" ON "LikedPost"("userId", "postId");

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
