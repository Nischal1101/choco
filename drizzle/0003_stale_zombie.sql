ALTER TABLE "warehouses" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;