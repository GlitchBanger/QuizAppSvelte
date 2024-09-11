import { Hono } from "hono";
import { db } from "../../../db";
import { test, question, testResponse, questionResponse } from "../../../schema";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";

const tests = new Hono();

// Define validation schemas with improved validation
const testSchema = z.object({
  title: z.string().min(1, "Title is required."),
});

const AnswerKeyEnum = z.enum(["A", "B", "C", "D"])

const questionSchema = z.object({
  questionText: z.string().min(1, "Question text is required."),
  optionA: z.string().min(1, "Option A is required."),
  optionB: z.string().min(1, "Option B is required."),
  optionC: z.string().min(1, "Option C is required."),
  optionD: z.string().min(1, "Option D is required."),
  answerKey: AnswerKeyEnum,
});

const responseSchema = z.object({
  selectedOption: AnswerKeyEnum,
});

// Fetch all tests or by createdBy query
tests.get("/", async (c) => {
  try {
    const createdBy = c.req.query("createdBy");
    const testsData = createdBy
      ? await db.select().from(test).where(eq(test.createdBy, Number(createdBy)))
      : await db.select().from(test);

    return c.json(testsData);
  } catch (error) {
    console.error("Error fetching tests:", error);
    return c.json({ error: "Failed to fetch tests." }, 500);
  }
});

// Create a new test
tests.post("/", zValidator("json", testSchema), async (c) => {
  try {
    const body = c.req.valid("json");
    const createdBy = c.req.query("createdBy");

    if (!createdBy) {
      return c.json({ error: "createdBy query is required." }, 400);
    }

    const response = await db
      .insert(test)
      .values({ title: body.title, createdBy: Number(createdBy) })
      .returning({ id: test.id });

    return c.json(response.pop());
  } catch (error) {
    console.error("Error creating test:", error);
    return c.json({ error: "Failed to create test." }, 500);
  }
});

tests.delete("/", async (c) => {
  try {
    const testId = c.req.query("testId");

    // Ensure testId is provided and is a valid number
    if (!testId || isNaN(Number(testId))) {
      return c.json({ success: false, message: "Invalid or missing testId" }, 400);
    }

    const deletedRows = await db.delete(test).where(eq(test.id, Number(testId)));

    // Check if the test was deleted
    if (deletedRows === 0) {
      return c.json({ success: false, message: "Test not found or already deleted" }, 404);
    }

    // Return success response
    return c.json({ success: true, message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

// Fetch all questions or by testId
tests.get("/questions", async (c) => {
  try {
    const testId = c.req.query("testId");

    const questionsData = testId
      ? await db.select().from(question).where(eq(question.testId, Number(testId)))
      : await db.select().from(question);

    return c.json(questionsData);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return c.json({ error: "Failed to fetch questions." }, 500);
  }
});

// Fetch a specific question by questionId
tests.get("/question", async (c) => {
  try {
    const questionId = c.req.query("questionId");

    if (!questionId) {
      return c.json({ error: "questionId query is required." }, 400);
    }

    const questionData = await db
      .select()
      .from(question)
      .where(eq(question.id, Number(questionId)));

    return c.json(questionData.pop());
  } catch (error) {
    console.error("Error fetching question:", error);
    return c.json({ error: "Failed to fetch question." }, 500);
  }
});

tests.delete("/question", async (c) => {
  try {
    const questionId = c.req.query("questionId");

    // Ensure questionId is provided and is a valid number
    if (!questionId || isNaN(Number(questionId))) {
      return c.json({ success: false, message: "Invalid or missing questionId" }, 400);
    }

    const deletedRows = await db.delete(question).where(eq(question.id, Number(questionId)));

    // Check if the question was deleted
    if (deletedRows === 0) {
      return c.json({ success: false, message: "Question not found or already deleted" }, 404);
    }

    // Return success response
    return c.json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});


// Create a new question
tests.post("/questions", zValidator("json", questionSchema), async (c) => {
  try {
    const body = c.req.valid("json");
    const testId = c.req.query("testId");

    if (!testId) {
      return c.json({ error: "testId query is required." }, 400);
    }

    const response = await db
      .insert(question)
      .values({ ...body, testId: Number(testId) })
      .returning({ id: question.id });

    return c.json(response.pop());
  } catch (error) {
    console.error("Error creating question:", error);
    return c.json({ error: "Failed to create question." }, 500);
  }
});

// Update an existing question
tests.put("/questions", zValidator("json", questionSchema), async (c) => {
  try {
    const body = c.req.valid("json");
    const questionId = c.req.query("questionId");

    if (!questionId) {
      return c.json({ error: "questionId query is required." }, 400);
    }

    const response = await db
      .update(question)
      .set(body)
      .where(eq(question.id, Number(questionId)))
      .returning({ testId: question.testId });

    return c.json(response.pop());
  } catch (error) {
    console.error("Error updating question:", error);
    return c.json({ error: "Failed to update question." }, 500);
  }
});

// Create or fetch a test response for a student
tests.get("/createresponse", async (c) => {
  try {
    const testId = c.req.query("testId");
    const studentId = c.req.query("studentId");

    if (!testId || !studentId) {
      return c.json({ error: "Both testId and studentId queries are required." }, 400);
    }

    const existingResponse = await db
      .select()
      .from(testResponse)
      .where(and(eq(testResponse.testId, Number(testId)), eq(testResponse.studentId, Number(studentId))));

    if (existingResponse.length > 0) {
      return c.json({ id: existingResponse.pop()?.id });
    }

    const newResponse = await db
      .insert(testResponse)
      .values({ testId: Number(testId), studentId: Number(studentId) })
      .returning({ id: testResponse.id });

    return c.json(newResponse.pop());
  } catch (error) {
    console.error("Error creating or fetching test response:", error);
    return c.json({ error: "Failed to create or fetch test response." }, 500);
  }
});

// Fetch all question responses
tests.get("/questionresponse", async (c) => {
  try {
    const questionResponses = await db.select().from(questionResponse);
    return c.json(questionResponses);
  } catch (error) {
    console.error("Error fetching question responses:", error);
    return c.json({ error: "Failed to fetch question responses." }, 500);
  }
});

// Fetch the test response with its question responses and correctness
tests.get("/testresponse", async (c) => {
  try {
    const responseId = c.req.query("responseId");

    if (!responseId) {
      return c.json({ error: "responseId query is required." }, 400);
    }

    const testResp = (await db.select().from(testResponse).where(eq(testResponse.id, Number(responseId)))).pop();

    if (!testResp) {
      return c.json({ error: "Test response not found." }, 404);
    }

    const questions = await db.select().from(question).where(eq(question.testId, Number(testResp.testId)));
    const questionResponses = await db.select().from(questionResponse).where(eq(questionResponse.responseId, Number(responseId)));

    const responseMap = new Map();
    questionResponses.forEach((qr) => {
      responseMap.set(qr.questionId, qr);
    });

    const updatedQuestions = questions.map((q) => {
      const questionResp = responseMap.get(q.id);
      return {
        ...q,
        responded: !!questionResp,
        correct: questionResp ? questionResp.selectedOption === q.answerKey : false,
      };
    });

    return c.json(updatedQuestions);
  } catch (error) {
    console.error("Error fetching test response details:", error);
    return c.json({ error: "Failed to fetch test response details." }, 500);
  }
});

// Register or update a question response
tests.post("/registerresponse", zValidator("json", responseSchema), async (c) => {
  try {
    const body = c.req.valid("json");
    const responseId = c.req.query("responseId");
    const questionId = c.req.query("questionId");

    if (!responseId || !questionId) {
      return c.json({ error: "Both responseId and questionId queries are required." }, 400);
    }

    const existingResponse = await db
      .select()
      .from(questionResponse)
      .where(and(eq(questionResponse.responseId, Number(responseId)), eq(questionResponse.questionId, Number(questionId))));

    if (existingResponse.length > 0) {
      await db
        .update(questionResponse)
        .set(body)
        .where(eq(questionResponse.id, Number(existingResponse.pop()?.id)));
      return c.json({ success: true, message: "Response updated successfully." });
    }

    await db.insert(questionResponse).values({
      ...body,
      responseId: Number(responseId),
      questionId: Number(questionId),
    });

    return c.json({ success: true, message: "Response registered successfully." });
  } catch (error) {
    console.error("Error registering or updating response:", error);
    return c.json({ error: "Failed to register or update response." }, 500);
  }
});

export default tests;
