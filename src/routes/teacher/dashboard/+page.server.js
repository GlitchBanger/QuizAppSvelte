import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const createdBy = event.cookies.get("teacher");
  if (createdBy) {
    const response = await fetch(
      env.LOCAL_URL + "/api/tests?createdBy=" + createdBy
    );
    const resp = await response.json();
    return {
      tests: resp,
    };
  }
  return redirect(302, "/teacher/login")
};
