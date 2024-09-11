import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const createdBy = event.cookies.get("teacher");
  const testId = event.params.testId;

  if (!createdBy) {
    return redirect(302, "/teacher/login");
  }

  if (!testId) {
    return redirect(302, "/error"); // Redirect or handle the case where testId is missing
  }

  try {
    const response = await fetch(
      `${env.LOCAL_URL}/api/tests/testresponses?testId=${testId}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch test responses');
    }

    const testResponses = await response.json();

    console.log(testResponses)

    return {
      testResponses
    };
  } catch (error) {
    console.error("Error fetching test responses:", error);
    return {
      error: "Failed to fetch test responses."
    };
  }
};
