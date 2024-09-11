// src/routes/teacher/add-question/+page.server.js
import { env } from "$env/dynamic/private";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

const AnswerKeyEnum = z.enum(["A", "B", "C", "D"]);

const questionSchema = z.object({
  questionText: z.string(),
  optionA: z.string(),
  optionB: z.string(),
  optionC: z.string(),
  optionD: z.string(),
  answerKey: AnswerKeyEnum,
});

// Load function (if needed, adjust based on your requirements)
export const load = async (event) => {
  const createdBy = event.cookies.get("teacher");

  // Check if the teacher cookie is present, otherwise redirect to login
  if (!createdBy) {
    return redirect(302, "/teacher/login");
  }
  return {
    form: await superValidate(zod(questionSchema)), // Initialize form with validation schema
  };
};

// Actions to handle form submission
export const actions = {
  default: async (event) => {
    
    const testId = event.params.testId
    // Validate form data
    const form = await superValidate(event.request, zod(questionSchema));

    console.log(form);

    if (!form.valid) {
      // If validation fails, return the form with validation errors
      return fail(400, {
        form,
      });
    }

    // Send form data to the API
    const response = await fetch(env.LOCAL_URL + "/api/tests/questions?testId=" + testId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.data),
    });

    const res = await response.json();

    console.log(res)

    return redirect(302, "/teacher/test/" + testId);
  },
};
