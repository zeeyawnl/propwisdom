CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"price" numeric(12, 2) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100),
	"zip_code" varchar(20),
	"bedrooms" integer,
	"bathrooms" integer,
	"sqft" integer,
	"image_url" text,
	"type" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'Available' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
