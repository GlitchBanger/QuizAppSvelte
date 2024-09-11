import { fail, redirect } from "@sveltejs/kit";

export const load = async (event) => {
    event.cookies.delete("teacher", {path: "/"})
    return redirect(302, "/teacher/login")
  };