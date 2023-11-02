import { z } from "zod";
class FileLike {
  name: string;
  size: number;
  type: string;
  // add any other properties you might be using from the File API
}
export const dappSchema = z.object({
  name: z.string().min(3).max(100),
  slogan: z.string().min(3).max(200),
  site: z.string().url(),
  apr: z.string(),
  tools: z.string(),
  description: z.string().min(3).max(300),
  twitter: z.optional(z.string()),
  github: z.optional(z.string()),
});

export const addressSchema = z.object({
  address: z.string().startsWith("erd"),
});
