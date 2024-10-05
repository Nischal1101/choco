import { z } from "zod";

const isServer = typeof window === "undefined";
export const productSchema = z.object({
  name: z.string({ message: "product name should be a string" }).min(4),
  description: z
    .string({ message: "product description should be string" })
    .min(8),
  price: z.number({ message: "product price should be number" }),
  image: z.instanceof(isServer ? File : FileList, {
    message: "product image should be an image",
  }),
});
