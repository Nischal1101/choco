import { z } from "zod";
export const productSchema = z.object({
  name: z.string({ message: "product name should be a string" }),
  description: z.string({ message: "product description should be string" }),
  price: z.number({ message: "product price should be number" }),
  image: z.instanceof(File, { message: "product image should be an image" }),
});
