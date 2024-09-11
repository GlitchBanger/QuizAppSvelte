<script>
  import { z } from "zod";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as Form from "$lib/components/ui/form";
  import { Button } from "$lib/components/ui/button";

  export let data;
  export let question;

  // Define the schema for the response form
  const responseSchema = z.object({
    selectedOption: z.enum(["A", "B", "C", "D"]),
  });

  const form = superForm(data, {
    validators: zodClient(responseSchema),
  });

  // Initialize form using superForm with Zod schema
  const { form: formData, enhance } = form;

  // Function to select an option and apply styling
  let selectedButton = '';

  // @ts-ignore
  function selectOption(option) {
    $formData.selectedOption = option;
    selectedButton = option;
  }
</script>

<style>
  .form-container {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    box-sizing: border-box;
  }

  .question-header {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
    line-height: 1.4;
  }

  .hidden-select {
    display: none;
  }

  .option-btn {
    padding: 12px 20px;
    border: 1px solid #ccc;
    margin: 5px;
    cursor: pointer;
    background-color: #f9f9f9;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;
    font-size: 1rem;
    text-align: center;
  }

  .option-btn.selected {
    background-color: #ffa500;
    color: #fff;
  }

  .option-btn:hover {
    background-color: #eee;
  }

  .submit-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 15px;
    }

    .question-header {
      font-size: 1.25rem;
    }

    .option-btn {
      padding: 10px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .option-btn {
      padding: 8px;
      font-size: 0.8rem;
      margin: 4px;
    }
  }
</style>

<div class="form-container">
  <!-- Header with the question text -->
  <div class="question-header">
    {question.questionText}
  </div>

  <!-- Form for selecting an option -->
  <form
    method="POST"
    use:enhance
  >
    <!-- Hidden select box for options -->
    <Form.Field {form} name="selectedOption">
      <Form.Control let:attrs>
        <select
          {...attrs}
          bind:value={$formData.selectedOption}
          class="hidden-select"
        >
          <option value="A">{question.optionA}</option>
          <option value="B">{question.optionB}</option>
          <option value="C">{question.optionC}</option>
          <option value="D">{question.optionD}</option>
        </select>
      </Form.Control>
    </Form.Field>

    <!-- Custom buttons for each option -->
    <div class="flex flex-wrap justify-center mb-4">
      <button
        type="button"
        class="option-btn {selectedButton === 'A' ? 'selected' : ''}"
        on:click={() => selectOption('A')}
      >
        {question.optionA}
      </button>

      <button
        type="button"
        class="option-btn {selectedButton === 'B' ? 'selected' : ''}"
        on:click={() => selectOption('B')}
      >
        {question.optionB}
      </button>

      <button
        type="button"
        class="option-btn {selectedButton === 'C' ? 'selected' : ''}"
        on:click={() => selectOption('C')}
      >
        {question.optionC}
      </button>

      <button
        type="button"
        class="option-btn {selectedButton === 'D' ? 'selected' : ''}"
        on:click={() => selectOption('D')}
      >
        {question.optionD}
      </button>
    </div>

    <!-- Submit button -->
    <div class="submit-container">
      <Button type="submit" class="hover:bg-orange-500">Submit</Button>
    </div>
  </form>
</div>
