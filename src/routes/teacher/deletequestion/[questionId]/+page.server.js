import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    const questionId = event.params.questionId;

    // Make sure questionId is available
    if (!questionId) {
        return {
            status: 400,
            error: new Error("Question ID is missing"),
        };
    }

    // Call the delete question API
    const response = await fetch(`${env.LOCAL_URL}/api/tests/question?questionId=${questionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Check for errors in the API call
    if (!response.ok) {
        return {
            status: response.status,
            error: new Error("Failed to delete the question"),
        };
    }

    // Redirect to the appropriate dashboard or test page after deletion
    return redirect(302, "/teacher/dashboard");
};
