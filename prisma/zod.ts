import { z } from 'zod'

// User schema
const userSchema = z.object({
  id: z.number(),
  position: z.string(),
  email: z.string().email(),
  username: z.string(),
  fullname: z.string(),
  password: z.string(),
  role: z.enum(['STAFF', 'ADMIN']),
});

// ActivityHistory schema
const activityHistorySchema = z.object({
  id: z.number(),
  activityMessage: z.string(),
  activityType: z.enum(['Logged', 'Created', 'Deleted', 'Updated']),
  createdAt: z.date(),
  topLevel: z.boolean(),
});

// Notification schema
const notificationSchema = z.object({
  id: z.number(),
  userId: z.number(),
  activityId: z.number(),
});

// Inventory schema
const inventorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  userId: z.number(),
  quantity: z.number(),
  functionalItems:  z.number(),
  disfunctionalItems:  z.number(),
  picture: z.string().url().optional(),
  remark: z.string().optional(),
});


export {
    userSchema,
    notificationSchema,
    activityHistorySchema,
    inventorySchema
}