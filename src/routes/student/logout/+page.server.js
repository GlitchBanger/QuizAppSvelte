import { fail, redirect } from "@sveltejs/kit";

export const load = async (event) => {
    event.cookies.delete("student", {path: "/"})
    return redirect(302, "/student/login")
  };