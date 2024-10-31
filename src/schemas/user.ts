import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(), // New property for avatar URL
});

export type User = z.infer<typeof UserSchema>;
