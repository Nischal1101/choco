import { z } from "zod";
export const warehouseSchema = z.object({
  name: z.string({ message: "product name should be a string" }),
  pincode: z.string({ message: "product pincode should be string" }).length(6),
});
