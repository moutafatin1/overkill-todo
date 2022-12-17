import { z } from "zod";

export const newTaskSchema = z.object({
  text: z.string().min(1, "task is required"),
});

export type newTaskFormData = z.infer<typeof newTaskSchema>