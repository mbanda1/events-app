import {z} from 'zod'

 export const eventSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(1)
})