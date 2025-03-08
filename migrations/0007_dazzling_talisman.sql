CREATE TABLE "bookmarks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"name" text NOT NULL,
	"image" text DEFAULT 'image',
	"created_at" timestamp with time zone DEFAULT now(),
	"owner" text NOT NULL,
	CONSTRAINT "bookmarks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DROP TABLE "bookmark_table" CASCADE;