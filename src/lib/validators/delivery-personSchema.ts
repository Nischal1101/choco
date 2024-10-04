import { z } from "zod";
export const deliveryPersonSchema = z.object({
  name: z.string({ message: "delivery person  name should be a string" }),
  phone: z
    .string({ message: "delivery person phone should be string" })
    .length(13, "delivery person phone should be 13 chars long"),
  warehouseId: z.number({ message: "warehouse Id should be a number " }),
});
