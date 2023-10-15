import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { userSchema } from "@/prisma/zod";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
    try {
      const url = new URL(req.url);
      const user_id = url.searchParams.get("id");
      const filter_keyword = url.searchParams.get("filter");
      const search_keyword = url.searchParams.get("search");
      const role = url.searchParams.get('role')
  
      // If fetching a single user, handle separately
      if (user_id) {
        const id = parseInt(user_id);
        const user = await prisma.user.findUnique({ where: { id: id } });
        return NextResponse.json(user);
      }
  
      // Build the where clause for Prisma
      let whereClause:any = {};
  
      if (role) {
        whereClause.role = role;
      }
  
      if (filter_keyword || search_keyword) {
        whereClause.OR = [
          { username: { contains: filter_keyword || search_keyword } },
          { email: { contains: filter_keyword || search_keyword } },
        ];
      }
  
      // Fetch users based on the where clause
      const users = await prisma.user.findMany({ where: whereClause });
      
      return NextResponse.json(users);
  
    } catch (error) {
      return NextResponse.error();
    }
  }
  

export async function POST(req: NextRequest) {
  const body = req.body;

  try {
    const validatedData = userSchema.parse(body);

    const newUser = await prisma.user.create({ data: validatedData });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  const body = req.body;
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    const partialUserSchema = userSchema.partial();
    const validatedData = partialUserSchema.parse(body);

    if (id) {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: validatedData,
      });
      return NextResponse.json(updatedUser);
    }
    return NextResponse.json({ msg: "user doesn't exist" });
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
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (user) {
        const deletedUser = await prisma.user.delete({
          where: { id: parseInt(id) },
        });
        return NextResponse.json(deletedUser);
      }
      return NextResponse.json({ msg: "User doesn't exist" });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
