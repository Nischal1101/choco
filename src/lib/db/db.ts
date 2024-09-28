import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryString = process.env.DATABASE_URL;
export const connection = postgres(queryString!);

export const db = drizzle(connection);
