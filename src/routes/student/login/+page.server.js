// src/routes/settings/+page.server.js
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "../../../lib/components/custom/Student/LoginForm/schema";
import { zod } from "sveltekit-superforms/adapters";
import { env } from "$env/dynamic/private";

export const load = async (event) => {
  const student = event.cookies.get("student");
  console.log(student);
  if (student) {
    return redirect(302, "/student/dashboard")
  }
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));

    console.log(form);

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const response = await fetch(env.LOCAL_URL + "/api/students/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.data),
    });
    const res = await response.json();
    console.log(res);
    if (res.success) {
      console.log(res)
      event.cookies.set("student", `${res.data.id}`, {path: "/"})
      return redirect(302, "/student/dashboard");
    }
    return {
      form,
    };
  },
};
