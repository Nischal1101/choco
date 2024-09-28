import { defineConfig } from "drizzle-kit";
console.log(process.env.DATABASE_URL);
export default defineConfig({
  dialect: "postgresql", // "postgresql" | "mysql"
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: "./src/lib/db/schema.ts",
});
