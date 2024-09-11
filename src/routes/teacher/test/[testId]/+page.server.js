import { env } from "$env/dynamic/private";

export const load = async (event) => {
    const testId = event.params.testId;

    const response = await fetch(env.LOCAL_URL + "/api/tests/questions?testId=" + testId)
    const resp = await response.json()

    return {
        questions: resp,
        testId: testId
    }

}