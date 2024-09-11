import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  retype: z.string()
}).refine(data => data.password === data.retype, {
  message: "Passwords must match",
  path: ["retype"], // The error will be associated with the 'retype' field
});
