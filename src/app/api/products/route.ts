import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  const data = await request.formData();
  let validatedData;
  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      image: data.get("image"),
      price: Number(data.get("price")),
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }
  const filename = ` ${Date.now()}.${validatedData.image.name.split(".")[1]}`;
  let pathName;
  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());
    pathName = path.join(process.cwd(), "public/assets", filename);
    await writeFile(pathName, buffer);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
  try {
    await db.insert(products).values({ ...validatedData, image: filename });
  } catch (error) {
    await unlink(pathName);
    return Response.json({ message: error }, { status: 500 });
  }
  return Response.json({ message: "OK" }, { status: 201 });
}

export async function GET() {
  let returnedProducts;
  try {
    returnedProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.id));
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
  return Response.json(returnedProducts, { status: 200 });
}
