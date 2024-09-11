<script>
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import { formSchema } from "./schema";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<style>
  .form-container {
    max-width: 100%;
    width: 100%;
    max-width: 400px;
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

  .login-link {
    display: inline-block;
    padding: 0.75rem 1rem;
    color: #007bff;
    text-decoration: none;
    border: 1px solid #007bff;
    border-radius: 4px;
    text-align: center;
    transition: background-color 0.3s, color 0.3s;
    margin-top: 1rem;
    display: block;
    text-align: center;
  }

  .login-link:hover {
    background-color: #007bff;
    color: white;
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 15px;
    }

    .form-button, .login-link {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 10px;
    }

    .form-button, .login-link {
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
  <!-- Full Name field -->
  <Form.Field {form} name="name" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Full Name</Form.Label>
      <Input {...attrs} class="form-input" placeholder="Enter your full name" bind:value={$formData.name} />
    </Form.Control>
    <Form.Description class="form-description">Enter your Full Name.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <!-- Email field -->
  <Form.Field {form} name="email" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Email</Form.Label>
      <Input {...attrs} type="email" class="form-input" placeholder="Enter your email" bind:value={$formData.email} />
    </Form.Control>
    <Form.Description class="form-description">Enter your email.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <!-- Password field -->
  <Form.Field {form} name="password" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Password</Form.Label>
      <Input {...attrs} type="password" class="form-input" placeholder="Enter your password" bind:value={$formData.password} />
    </Form.Control>
    <Form.Description class="form-description">This is your secret password.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <!-- Re-type Password field -->
  <Form.Field {form} name="retype" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Re-type Password</Form.Label>
      <Input {...attrs} type="password" class="form-input" placeholder="Re-type your password" bind:value={$formData.retype} />
    </Form.Control>
    <Form.Description class="form-description">Re-enter your password for confirmation.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <!-- Submit button and Login link -->
  <div class="flex flex-col items-start">
    <Form.Button type="submit" class="form-button">Sign Up</Form.Button>
    <a href="/teacher/login" class="login-link">Login</a>
  </div>
</form>
