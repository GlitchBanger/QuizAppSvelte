<script>
  import { z } from "zod";
  import * as Form from "$lib/components/ui/form"; // Importing shadcn UI form components
  import { Input } from "$lib/components/ui/input"; // Input field component
  import { superForm } from "sveltekit-superforms"; // Superform for validation
  import { zodClient } from "sveltekit-superforms/adapters"; // Zod validation

  export let data;

  // Define the schema for the form
  const testSchema = z.object({
      title: z.string().min(1, "Title is required"), // Validating that title is required
  });

  // Initialize form using superForm with Zod schema
  const form = superForm(data, { validators: zodClient(testSchema) });
  const { form: formData, enhance } = form;
</script>

<style>
  .form-container {
    max-width: 500px;
    width: 90%;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .form-field {
    margin-bottom: 1rem;
  }

  .form-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .form-description {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
  }

  .form-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    text-align: center;
    margin-top: 1rem;
  }

  .form-button:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 15px;
    }

    .form-button {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 10px;
    }

    .form-button {
      font-size: 0.75rem;
      padding: 0.5rem;
    }
  }
</style>

<form
  method="POST"
  use:enhance
  class="form-container"
>
  <!-- Title field -->
  <Form.Field {form} name="title" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Title</Form.Label>
      <Input
        {...attrs}
        bind:value={$formData.title}
        placeholder="Enter test title"
        class="form-input"
      />
    </Form.Control>
    <Form.Description class="form-description">
      Provide a descriptive title for the test.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <!-- Submit button -->
  <div class="flex justify-start">
    <Form.Button type="submit" class="form-button mr-2">Submit</Form.Button>
    <a href="/teacher/dashboard">Cancel</a>
  </div>
</form>
