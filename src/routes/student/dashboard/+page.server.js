// +page.server.js

import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";

export async function load(event) {
  const createdBy = event.cookies.get("student");

  // Check if the student cookie is present, otherwise redirect to login
  if (!createdBy) {
    return redirect(302, "/student/login");
  }

  try {
    // Fetch data from the API
    const response = await fetch(env.LOCAL_URL + "/api/tests");

    // Check if the response status is OK (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the response for debugging
    console.log(data);

    // Return the data to the page
    return {
      tests: data,
    };
  } catch (error) {
    // Handle errors and log them
    console.error("Failed to load tests:", error);

    // Return an empty array or an error object to handle in the component
    return {
      tests: [],
    };
  }
}
