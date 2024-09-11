import { env } from "$env/dynamic/private";
import { fail, redirect } from "@sveltejs/kit";

export async function load(event) {
  const createdBy = event.cookies.get("student");

  // Check if the student cookie is present, otherwise redirect to login
  if (!createdBy) {
    return redirect(302, "/student/login");
  }

  const testId = event.params.testId;
  const studentId = event.cookies.get("student");
  const response = await fetch(
    `${env.LOCAL_URL}/api/tests/createresponse?testId=${testId}&studentId=${studentId}`
  );
  const res = await response.json();
  return redirect(302, `/student/response/${res.id}`);
}
