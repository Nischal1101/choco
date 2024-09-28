import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  dialect: "postgresql", // "postgresql" | "mysql"
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  schema: "./src/lib/db/schema.ts",
});
