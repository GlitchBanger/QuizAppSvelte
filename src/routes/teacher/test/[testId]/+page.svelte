<script>
  export let data;
</script>

<main class="p-4">
  <h1 class="text-xl font-bold mb-4">Test Questions</h1>
  <a
    href={`/teacher/addquestion/${data.testId}`}
    class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
  >
    Add Question
  </a>
  {#if data.questions.length > 0}
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {#each data.questions as question}
        <div class="bg-white p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-lg font-semibold mb-2">{question.questionText}</h2>
          <div class="flex space-x-2">
            <a
              href={`/teacher/editquestion/${question.id}`}
              class="bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 inline-block"
            >
              Edit
            </a>
            <a
              href={`/teacher/deletequestion/${question.id}`}
              class="bg-red-500 text-white text-center py-2 px-4 rounded hover:bg-red-600 inline-block"
            >
              Delete
            </a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>No questions available.</p>
  {/if}
</main>

<style>
  main {
    max-width: 800px;
    margin: auto;
  }

  @media (max-width: 640px) {
    .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>
