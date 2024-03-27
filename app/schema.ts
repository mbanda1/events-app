import { z } from 'zod'

 export const eventSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(1).max(65535)
})

export const patchEventsSchema = z.object({
  title: z.string().min(2, 'Title is required').max(255).optional(),
  description: z.string().min(1, 'Description is required').max(65535).optional(),
  assignedUserId: z.string().min(1, 'assignedUserId is required').max(255).optional().nullable(),
})