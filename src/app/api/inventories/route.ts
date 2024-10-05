import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const data = await request.json();
  let validatedData;
  try {
    validatedData = inventorySchema.parse(data);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }
  try {
    await db.insert(inventories).values(validatedData);
    return Response.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: error + "failed to store inventories into database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await db
      .select({
        sku: inventories.sku,
        warehouse: warehouses.name,
        product: products.name,
      })
      .from(inventories)
      .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
      .leftJoin(products, eq(inventories.productId, products.id))
      .orderBy(desc(warehouses.id));
    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: error + "failed to store inventories into database" },
      { status: 500 }
    );
  }
}
