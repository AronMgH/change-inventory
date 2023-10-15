import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { inventorySchema } from "@/prisma/zod";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const inventory_id = url.searchParams.get("id");

    // If fetching a single inventory, handle separately
    if (inventory_id) {
      const id = parseInt(inventory_id);
      const inventory = await prisma.inventory.findUnique({ where: { id: id } });
      return NextResponse.json(inventory);
    }

    // Fetch all inventories
    const inventories = await prisma.inventory.findMany();
    
    return NextResponse.json(inventories);

  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  const body = req.body;

  try {
    const validatedData = inventorySchema.parse(body);

    const newInventory = await prisma.inventory.create({ data: validatedData });
    return NextResponse.json(newInventory);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  const body = req.body;
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    const partialInventorySchema = inventorySchema.partial();
    const validatedData = partialInventorySchema.parse(body);

    if (id) {
      const updatedInventory = await prisma.inventory.update({
        where: { id: parseInt(id) },
        data: validatedData,
      });
      return NextResponse.json(updatedInventory);
    }
    return NextResponse.json({ msg: "Inventory doesn't exist" });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest) {
  const body = req.body;
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    if (id) {
      const inventory = await prisma.inventory.delete({
        where: { id: parseInt(id) },
      });
      return NextResponse.json(inventory);
    }
    return NextResponse.json({ msg: "Inventory doesn't exist" });
  } catch (error) {
    return NextResponse.error();
  }
}
