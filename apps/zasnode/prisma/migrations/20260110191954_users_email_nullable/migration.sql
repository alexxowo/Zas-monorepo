-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "email" DROP NOT NULL;
