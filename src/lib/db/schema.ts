import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fname: varchar("fname", { length: 100 }).notNull(),
  lname: varchar("lname", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  provider: varchar("provider", { length: 100 }).notNull(),
  externalId: varchar("external_id", { length: 100 }).notNull(),
  image: text("image").notNull(),
  role: varchar("role", { length: 12 }).default("customer").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const warehouses = pgTable(
  "warehouses",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    pincode: varchar("pincode", { length: 6 }).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      pinCodeIndex: index("pincode_idx").on(table.pincode),
    };
  }
);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const deliveryPersons = pgTable("delivery_persons", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 13 }).notNull(),
  warehouseId: integer("warehouse_id").references(() => warehouses.id, {
    onDelete: "cascade",
  }),
  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
