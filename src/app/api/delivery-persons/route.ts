import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/delivery-personSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const requestData = await request.json();
  let validatedData;
  try {
    validatedData = deliveryPersonSchema.parse({
      ...requestData,
      warehouseId: Number(requestData.warehouseId),
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }
  try {
    await db.insert(deliveryPersons).values(validatedData);
  } catch (error) {
    return Response.json(
      { message: "failed to store delivery person into database" },
      { status: 500 }
    );
  }
  return Response.json({ message: "OK" }, { status: 201 });
}

export async function GET() {
  try {
    const allDeliveryPersons = await db
      .select({
        id: deliveryPersons.id,
        name: deliveryPersons.phone,
        phone: deliveryPersons.phone,
        warehouse: warehouses.name,
      })
      .from(deliveryPersons)
      .leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id))
      .orderBy(desc(deliveryPersons.id));
    return Response.json({ message: allDeliveryPersons }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "failed to get all delivery persons" },
      { status: 500 }
    );
  }
}
