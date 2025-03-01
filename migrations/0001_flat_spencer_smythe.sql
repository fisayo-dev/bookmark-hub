ALTER TABLE "users" ALTER COLUMN "profile_image_url" SET DEFAULT 'image';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "profile_image_url" DROP NOT NULL;