import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { db } from "../../../db";
import { teacher } from "../../../schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
// @ts-ignore
import bcrypt from "bcrypt";  // Password hashing

// Validation schema for teacher registration
const teacherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Validation schema for teacher login
const teacherLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const teachers = new Hono();

// Fetch all teachers
teachers.get("/", async (c) => {
  try {
    const allTeachers = await db.select().from(teacher);
    return c.json(allTeachers);
  } catch (error) {
    // @ts-ignore
    return c.json({ error: "Failed to fetch teachers", details: error.message }, 500);
  }
});

// Register a new teacher
teachers.post(
  "/", 
  zValidator("json", teacherSchema), 
  async (c) => {
    const body = c.req.valid("json");
    const { name, email, password } = body;
    const createdAt = new Date();

    try {
      // Hash the password before saving to DB
      const hashedPassword = await bcrypt.hash(password, 10);

      const dbres = await db.insert(teacher).values({
        name,
        email,
        password: hashedPassword,
        createdAt,
      }).returning({ id: teacher.id });

      const id = dbres.pop()?.id;
      return c.json({ success: true, data: { id, name, email } });
    } catch (e) {
      // @ts-ignore
      return c.json({ success: false, error: "Failed to create teacher", details: e.message }, 500);
    }
  }
);

// Teacher login
teachers.post("/login", zValidator("json", teacherLoginSchema), async (c) => {
  const body = c.req.valid("json");
  const { email, password } = body;

  try {
    const result = await db.select().from(teacher).where(eq(teacher.email, email));
    const singleUser = result.pop();

    if (!singleUser) {
      return c.json({ success: false, error: "Teacher not found" }, 404);
    }

    // Compare the stored hashed password with the provided password
    const isPasswordCorrect = await bcrypt.compare(password, singleUser.password);

    if (isPasswordCorrect) {
      const { name, id } = singleUser;
      return c.json({ success: true, data: { id, name, email } });
    } else {
      return c.json({ success: false, error: "Incorrect password" }, 401);
    }
  } catch (e) {
    // @ts-ignore
    return c.json({ success: false, error: "Login failed", details: e.message }, 500);
  }
});

// Delete a teacher by ID
teachers.delete("/", async (c) => {
  const id = c.req.query("id");

  if (!id) {
    return c.json({ error: "ID parameter is required" }, 400);
  }

  try {
    await db.delete(teacher).where(eq(teacher.id, Number(id)));
    return c.text(`Teacher with ID ${id} deleted successfully`);
  } catch (e) {
    // @ts-ignore
    return c.json({ error: `Failed to delete teacher with ID ${id}`, details: e.message }, 500);
  }
});

export default teachers;
