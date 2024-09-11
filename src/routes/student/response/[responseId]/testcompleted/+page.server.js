export const load = async (event) => {
    const data = await event.parent();
    console.log(data)
    return {answeredCorrect: data.correct, totalResponse: data.questions.length}
}