import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";

export const student = pgTable("student", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const teacher = pgTable("teacher", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const test = pgTable("test", {
  id: serial("id").primaryKey(),
  title: text("title"),
  createdBy: integer("created_by").references(() => teacher.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const question = pgTable("question", {
  id: serial("id").primaryKey(),
  testId: integer("test_id").references(() => test.id, { onDelete: "cascade" }),
  questionText: text("question_text"),
  optionA: text("option_a"),
  optionB: text("option_b"),
  optionC: text("option_c"),
  optionD: text("option_d"),
  answerKey: text("answer_key"),
});

export const testResponse = pgTable("test_response", {
  id: serial("id").primaryKey(),
  testId: integer("test_id").references(() => test.id, { onDelete: "cascade" }),
  studentId: integer("student_id").references(() => student.id, { onDelete: "cascade" }),
});

export const questionResponse = pgTable("question_response", {
  id: serial("id").primaryKey(),
  responseId: integer("response_id").references(() => testResponse.id, { onDelete: "cascade" }),
  questionId: integer("question_id").references(() => question.id, { onDelete: "cascade" }),
  selectedOption: text("selected_option"),
});
