ALTER TABLE "bookmarks" ADD COLUMN "created_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "owner" text NOT NULL;