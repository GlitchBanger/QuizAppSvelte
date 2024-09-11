import { redirect } from '@sveltejs/kit';

export async function load(event) {
    const data = await event.parent();

    // Check if all questions have been answered
    if (data.questions.length === data.reduced) {
        return redirect(302, `/student/response/${data.responseId}/testcompleted`);
    }

    // Find the first unanswered question
    const unansweredQuestion = data.questions.find(question => !question.responded);

    // Find any question that has been responded to
    const anyResponded = data.questions.some(question => question.responded);

    // Log data for debugging
    console.log(data);

    if (anyResponded) {
        // Redirect to the first unanswered question
        return redirect(302, `/student/response/${data.responseId}/question/${unansweredQuestion.id}`);
    } else if (unansweredQuestion) {
        // If no questions have been responded to, just redirect to the first unanswered question
        return redirect(302, `/student/response/${data.responseId}/question/${unansweredQuestion.id}`);
    }

    // Handle edge cases where no unanswered questions are found
    return {
        questionId: unansweredQuestion ? unansweredQuestion.id : null,
        responseId: data.responseId
    };
}
