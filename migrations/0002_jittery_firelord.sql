CREATE TABLE "bookmarks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"name" text NOT NULL,
	"image" text DEFAULT 'bookmark-image-url',
	CONSTRAINT "bookmarks_id_unique" UNIQUE("id")
);
