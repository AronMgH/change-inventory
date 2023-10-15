import { PrismaClient, Prisma, ActivityType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { activityHistorySchema } from "@/prisma/zod";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
      const url = new URL(req.url);
      const activity_id = url.searchParams.get("id");
      const activity_type = url.searchParams.get("type");
      const top_level = url.searchParams.get("topLevel");
      const start_date = url.searchParams.get("startDate");
      const end_date = url.searchParams.get("endDate");
      const search_keyword = url.searchParams.get("search");
  
      // If fetching a single activity, handle separately
      if (activity_id) {
        const id = parseInt(activity_id);
        const activity = await prisma.activityHistory.findUnique({ where: { id: id } });
        return NextResponse.json(activity);
      }
  
      // Build the where clause for Prisma
      let whereClause: Prisma.ActivityHistoryWhereInput = {};
  
      if (activity_type) {
        whereClause.activityType = activity_type as ActivityType;
      }
  
      if (top_level) {
        whereClause.topLevel = top_level === 'true';
      }
  
      if (start_date && end_date) {
        whereClause.createdAt = {
          gte: new Date(start_date),
          lte: new Date(end_date),
        };
      }
  
      if (search_keyword) {
        whereClause.activityMessage = { contains: search_keyword };
      }
  
      // Fetch all activities based on the where clause
      const activities = await prisma.activityHistory.findMany({ where: whereClause });
      
      return NextResponse.json(activities);
  
    } catch (error) {
      return NextResponse.error();
    }
  }
  
  export async function POST(req: NextRequest) {
    const body = req.body;
  
    try {
      const validatedData = activityHistorySchema.parse(body);
  
      const newActivity = await prisma.activityHistory.create({ data: validatedData });
      return NextResponse.json(newActivity);
    } catch (error) {
      return NextResponse.error();
    }
  }
  
  export async function PUT(req: NextRequest) {
    const body = req.body;
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
  
    try {
      const partialActivitySchema = activityHistorySchema.partial();
      const validatedData = partialActivitySchema.parse(body);
  
      if (id) {
        const updatedActivity = await prisma.activityHistory.update({
          where: { id: parseInt(id) },
          data: validatedData,
        });
        return NextResponse.json(updatedActivity);
      }
      return NextResponse.json({ msg: "Activity doesn't exist" });
    } catch (error) {
      return NextResponse.error();
    }
  }
  
export async function DELETE(req: NextRequest) {
  const body = req.body;
  const url = new URL(req.url);
  const ids = url.searchParams.get("ids");

  try {
    if (ids) {
      const idArray = ids.split(',').map(id => parseInt(id));
      const deletedActivities = await prisma.activityHistory.deleteMany({
        where: { id: { in: idArray } },
      });
      return NextResponse.json(deletedActivities);
    }
  } catch (error) {
    return NextResponse.error();
  }
}