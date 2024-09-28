import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Request) {
  const requestData = await request.json();
  let validatedData;
  try {
    validatedData = warehouseSchema.parse(requestData);
  } catch (error) {
    return Response.json({ messsage: error }, { status: 400 });
  }
  try {
    await db.insert(warehouses).values(validatedData);
  } catch (error) {
    return Response.json(
      { messsage: "Failed to store warehouse" },
      { status: 400 }
    );
  }
  return Response.json({ message: "OK" }, { status: 201 });
}
