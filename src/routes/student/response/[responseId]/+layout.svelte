<script>
  // Data coming from +layout.server.js
  export let data;

  // Destructure the test data, assuming data contains `questions` array with `id` and `title`.
  const { questions, responseId } = data;
</script>

<div class="flex flex-col md:flex-row h-screen">
  <!-- Left Sidebar with list of questions -->
  <nav class="bg-gray-800 text-white p-4 md:w-1/4 md:flex-shrink-0 md:h-full overflow-y-auto">
    <h2 class="text-lg font-bold mb-4">Quiz Questions</h2>
    <ul class="space-y-2">
      {#each questions as question}
        <li>
          <a
            href={`/student/response/${responseId}/question/${question.id}`}
            class="block text-white p-2 rounded {question.responded ? 'bg-green-500 hover:bg-green-400' : 'bg-yellow-500 hover:bg-yellow-400'}"
          >
            {question.questionText}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <!-- Main Content Area -->
  <main class="flex-1 p-4 bg-gray-100 overflow-y-auto">
    <slot />
    <!-- This is where the child route content will be rendered -->
  </main>
</div>

<style>
  @media (max-width: 768px) {
    nav {
      width: 100%;
      height: auto;
      position: relative;
    }
    main {
      padding: 2rem;
    }
  }

  h2 {
    font-size: 1.5rem;
  }

  main {
    overflow-y: auto;
  }
</style>
