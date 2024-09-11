import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    const testId = event.params.testId
    // console.log()
    const response = await fetch(`${env.LOCAL_URL}/api/tests?testId=${testId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    return redirect(302, "/teacher/dashboard")

}