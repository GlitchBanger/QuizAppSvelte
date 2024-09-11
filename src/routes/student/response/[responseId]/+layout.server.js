import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
    const createdBy = event.cookies.get("student");

// Check if the student cookie is present, otherwise redirect to login
if (!createdBy) {
  return redirect(302, "/student/login");
}

    const responseId = event.params.responseId;

    try {
        const response = await fetch(`${env.LOCAL_URL}/api/tests/testresponse?responseId=${responseId}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const res = await response.json();

        const reduced = res.reduce((acc, cur) => cur.responded ? acc + 1 : acc, 0);
        const correct = res.reduce((acc, cur) => cur.correct ? acc + 1 : acc, 0);

        return {
            questions: res,
            responseId,
            reduced,
            correct
        };
    } catch (error) {
        console.error('Error loading data:', error);
        // Redirect or handle the error as appropriate
        throw redirect(302, '/error');
    }
}
