import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

export const load = async (event) => {
  const data = await event.parent();

  // Check if all questions have been answered
  if (data.questions.length === data.reduced) {
    return redirect(302, `/student/response/${data.responseId}/testcompleted`);
  }
  const questionId = event.params.questionId;
  const response = await fetch(
    `${env.LOCAL_URL}/api/tests/question?questionId=${questionId}`
  );
  const question = await response.json();
  const responseSchema = z.object({
    selectedOption: z.enum(["A", "B", "C", "D"]),
  });
  return {
    form: await superValidate(zod(responseSchema)),
    question: question, // Initialize form with validation schema
  };
};

export const actions = {
  default: async (event) => {
    const responseSchema = z.object({
      selectedOption: z.enum(["A", "B", "C", "D"]),
    });
    const form = await superValidate(event, zod(responseSchema));
    const response = await fetch(
      `${env.LOCAL_URL}/api/tests/registerresponse?responseId=${event.params.responseId}&questionId=${event.params.questionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.data),
      }
    );
    const resp = await response.json();
    return redirect(302, `/student/response/${event.params.responseId}`);
  },
};
