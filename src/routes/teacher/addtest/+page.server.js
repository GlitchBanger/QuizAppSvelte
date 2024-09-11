import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod'; // Import Zod for schema validation

// Define the schema for the form
const testSchema = z.object({
  title: z.string().min(1, 'Title is required'), // Validating that title is required
});

// Load function to check for cookies and return form data
export const load = async (event) => {
  const createdBy = event.cookies.get("teacher");

  // Check if the teacher cookie is present, otherwise redirect to login
  if (!createdBy) {
    return redirect(302, "/teacher/login");
  }
  return {
    form: await superValidate(zod(testSchema)), // Initialize form with validation schema
  };
};

// Actions to handle form submission
export const actions = {
  default: async (event) => {
    // Validate form data
    const form = await superValidate(event.request, zod(testSchema));

    console.log(form)

    if (!form.valid) {
      // If validation fails, return the form with validation errors
      return fail(400, {
        form,
      });
    }

    // Send form data to the API
    const response = await fetch(env.LOCAL_URL + '/api/tests?createdBy=' + event.cookies.get("teacher"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.data),
    });

    const res = await response.json();

    return redirect(302, "/teacher/dashboard");
  },
};
