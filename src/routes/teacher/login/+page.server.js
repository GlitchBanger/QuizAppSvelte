// src/routes/settings/+page.server.js
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "../../../lib/components/custom/Teacher/LoginForm/schema";
import { zod } from "sveltekit-superforms/adapters";
import { env } from "$env/dynamic/private";

export const load = async (event) => {
  const teacher = event.cookies.get("teacher")
  if (teacher) {
    redirect(302, "/teacher/dashboard");
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

    const response = await fetch(env.LOCAL_URL + "/api/teachers/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.data),
    });
    const res = await response.json();
    console.log(res);
    if (res.success) {
      event.cookies.set("teacher", `${res.data.id}`, {path: "/"})
      return redirect(302, "/teacher/dashboard");
    }
    return {
      form,
    };
  },
};
