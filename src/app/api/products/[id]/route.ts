import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  let product;
  try {
    product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    if (!product.length) {
      return Response.json({ message: "Product not found" }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
  return Response.json(product[0], { status: 200 });
}
