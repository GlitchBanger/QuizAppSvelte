import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { db } from "../../../db";
import { student } from "../../../schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
// @ts-ignore
import bcrypt from "bcrypt";  // Adding bcrypt for password hashing

// Student schema for validation
const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Student login schema
const studentLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const students = new Hono();

// Get all students
students.get("/", async (c) => {
  try {
    const all_students = await db.select().from(student);
    return c.json(all_students);
  } catch (error) {
    // @ts-ignore
    return c.json({ error: "Failed to retrieve students", details: error.message }, 500);
  }
});

// Create a new student
students.post(
  "/", 
  zValidator("json", studentSchema), 
  async (c) => {
    const body = c.req.valid("json");
    const { name, email, password } = body;
    const createdAt = new Date();

    try {
      // Hash the password before saving to DB
      const hashedPassword = await bcrypt.hash(password, 10);

      const dbres = await db.insert(student).values({
        name,
        email,
        password: hashedPassword,
        createdAt,
      }).returning({ id: student.id });

      const id = dbres.pop()?.id;

      return c.json({ success: true, data: { id, name, email } });
    } catch (e) {
      // @ts-ignore
      return c.json({ success: false, error: "Failed to create student", details: e.message }, 500);
    }
  }
);

// Login a student
students.post("/login", zValidator("json", studentLoginSchema), async (c) => {
  const body = c.req.valid("json");
  const { email, password } = body;

  try {
    const result = await db.select().from(student).where(eq(student.email, email));
    const singleUser = result.pop();

    if (!singleUser) {
      return c.json({ success: false, error: "User not found" }, 404);
    }

    // Compare passwords using bcrypt
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

// Delete a student by ID
students.delete("/", async (c) => {
  const id = c.req.query("id");

  if (!id) {
    return c.json({ error: "ID parameter is required" }, 400);
  }

  try {
    await db.delete(student).where(eq(student.id, Number(id)));
    return c.text(`Student with ID ${id} deleted successfully`);
  } catch (e) {
    // @ts-ignore
    return c.json({ error: `Failed to delete student with ID ${id}`, details: e.message }, 500);
  }
});

export default students;
