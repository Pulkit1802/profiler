/*
  Warnings:

  - The primary key for the `application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applicationId` on the `application` table. All the data in the column will be lost.
  - The primary key for the `hr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hrId` on the `hr` table. All the data in the column will be lost.
  - The primary key for the `job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jobId` on the `job` table. All the data in the column will be lost.
  - The primary key for the `questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionsId` on the `questions` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - Added the required column `id` to the `application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `hr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_userId_fkey";

-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_hrId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_applicationId_fkey";

-- AlterTable
ALTER TABLE "application" DROP CONSTRAINT "application_pkey",
DROP COLUMN "applicationId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "application_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "hr" DROP CONSTRAINT "hr_pkey",
DROP COLUMN "hrId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "hr_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "job" DROP CONSTRAINT "job_pkey",
DROP COLUMN "jobId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "job_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "questions" DROP CONSTRAINT "questions_pkey",
DROP COLUMN "questionsId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_hrId_fkey" FOREIGN KEY ("hrId") REFERENCES "hr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
