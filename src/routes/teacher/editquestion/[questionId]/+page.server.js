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
  const questionId = event.params.questionId;
  const response = await fetch(env.LOCAL_URL + "/api/tests/question?questionId=" + questionId)
  const resp = await response.json()
  return {
    form: await superValidate(zod(questionSchema.default(resp))), // Initialize form with validation schema
  };
};

export const actions = {
    default: async (event) => {
      const questionId = event.params.questionId
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
      const response = await fetch(env.LOCAL_URL + "/api/tests/questions?questionId=" + questionId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.data),
      });
  
      const res = await response.json();
  
      console.log(res)
  
      return redirect(302, "/teacher/test/" + res.testId);
    },
  };