import { z } from "zod";
export const inventorySchema = z.object({
  sku: z
    .string({ message: "sku should be a string" })
    .length(8, { message: "sku length should be exactly 8 chars long" }),
  orderId: z.number({ message: "order id  should be a number" }).optional(),
  warehouseId: z
    .number({ message: "warehouse id should be number" })
    .optional(),
  productId: z.number({ message: "product id should be number" }).optional(),
});
