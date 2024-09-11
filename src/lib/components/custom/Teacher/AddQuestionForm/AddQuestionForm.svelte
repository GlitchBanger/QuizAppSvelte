<script>
  import { zodClient } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms"; // Adjust the import path as needed
  import { z } from "zod";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";

  export let data;

  const AnswerKeyEnum = z.enum(["A", "B", "C", "D"]);

  const questionSchema = z.object({
    questionText: z.string(),
    optionA: z.string(),
    optionB: z.string(),
    optionC: z.string(),
    optionD: z.string(),
    answerKey: AnswerKeyEnum,
  });

  const form = superForm(data, {
    validators: zodClient(questionSchema),
  });

  const { form: formData, enhance } = form;
</script>

<style>
  .form-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
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

  .form-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-size: 1rem;
    color: #333;
  }

  .submit-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: #ffa500;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    text-align: center;
  }

  .submit-button:hover {
    background-color: #e59400;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 15px;
    }

    .submit-button {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 10px;
    }

    .submit-button {
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
    }
  }
</style>

<form
  method="POST"
  use:enhance
  class="form-container"
>
  <Form.Field {form} name="questionText" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Question Text</Form.Label>
      <Input {...attrs} bind:value={$formData.questionText} />
    </Form.Control>
    <Form.Description class="form-description">Enter the question text</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="optionA" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Option A</Form.Label>
      <Input {...attrs} bind:value={$formData.optionA} />
    </Form.Control>
    <Form.Description class="form-description">Enter option A</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="optionB" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Option B</Form.Label>
      <Input {...attrs} bind:value={$formData.optionB} />
    </Form.Control>
    <Form.Description class="form-description">Enter option B</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="optionC" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Option C</Form.Label>
      <Input {...attrs} bind:value={$formData.optionC} />
    </Form.Control>
    <Form.Description class="form-description">Enter option C</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="optionD" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Option D</Form.Label>
      <Input {...attrs} bind:value={$formData.optionD} />
    </Form.Control>
    <Form.Description class="form-description">Enter option D</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="answerKey" class="form-field">
    <Form.Control let:attrs>
      <Form.Label class="form-label">Answer Key</Form.Label>
      <select
        {...attrs}
        bind:value={$formData.answerKey}
        class="form-select"
      >
        <option value="">Select an answer</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
    </Form.Control>
    <Form.Description class="form-description">Select the correct answer</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <div class="w-fill flex flex-row justify-start">
    <Button type="submit" class="submit-button">Submit</Button>
  </div>
</form>
