import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { notificationSchema } from "@/prisma/zod";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const notification_id = url.searchParams.get("id");

    // If fetching a single notification, handle separately
    if (notification_id) {
      const id = parseInt(notification_id);
      const notification = await prisma.notification.findUnique({ where: { id: id } });
      return NextResponse.json(notification);
    }

    // Fetch all notifications
    const notifications = await prisma.notification.findMany();
    
    return NextResponse.json(notifications);

  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  const body = req.body;

  try {
    const validatedData = notificationSchema.parse(body);

    const newNotification = await prisma.notification.create({ data: validatedData });
    return NextResponse.json(newNotification);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  const body = req.body;
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    const partialNotificationSchema = notificationSchema.partial();
    const validatedData = partialNotificationSchema.parse(body);

    if (id) {
      const updatedNotification = await prisma.notification.update({
        where: { id: parseInt(id) },
        data: validatedData,
      });
      return NextResponse.json(updatedNotification);
    }
    return NextResponse.json({ msg: "Notification doesn't exist" });
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
      const notification = await prisma.notification.delete({
        where: { id: parseInt(id) },
      });
      return NextResponse.json(notification);
    }
    return NextResponse.json({ msg: "Notification doesn't exist" });
  } catch (error) {
    return NextResponse.error();
  }
}
