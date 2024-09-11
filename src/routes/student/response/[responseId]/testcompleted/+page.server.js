export const load = async (event) => {
    const data = await event.parent();
    const responseId = event.params.responseId;

    // Fetch the answer key for the responseId
    const answerKeyResponse = await event.fetch(`/api/tests/answerkey?responseId=${responseId}`);
    const answerKeyData = await answerKeyResponse.json();

    // Return the combined data
    return {
        answeredCorrect: data.correct,
        totalResponse: data.questions.length,
        answerKey: answerKeyData
    };
}
