/*
  Warnings:

  - You are about to drop the column `isLoggedIn` on the `auth_history` table. All the data in the column will be lost.
  - You are about to drop the column `loggedInAt` on the `auth_history` table. All the data in the column will be lost.
  - You are about to drop the column `loggedOutAt` on the `auth_history` table. All the data in the column will be lost.
  - Added the required column `signedOutAt` to the `auth_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auth` ADD COLUMN `isSignedIn` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `auth_history` DROP COLUMN `isLoggedIn`,
    DROP COLUMN `loggedInAt`,
    DROP COLUMN `loggedOutAt`,
    ADD COLUMN `signedInAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `signedOutAt` DATETIME(3) NOT NULL;
