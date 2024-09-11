<script>
  export let data; // Receive tests data from the load function
</script>

<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <div class="space-x-4">
      <a href="/teacher/logout" class="text-white hover:bg-gray-700 px-3 py-2 rounded">Logout</a>
      <a href="/teacher/addtest" class="text-white hover:bg-gray-700 px-3 py-2 rounded">Add Test</a>
    </div>
  </div>
</nav>

<main class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Test Dashboard</h1>

  <div class="bg-white p-4 rounded shadow-md">
    <h2 class="text-xl font-semibold mb-2">List of Tests</h2>
    {#if data.tests.length === 0}
      <p>No tests available.</p>
    {:else}
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.tests as test}
          <div class="bg-white p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-lg font-semibold mb-2">{test.title}</h3>
            <div class="flex justify-between space-x-2">
              <a
                href={`/teacher/test/${test.id}`}
                class="bg-blue-500 text-white text-center py-1 px-3 rounded hover:bg-blue-600"
              >
                Edit
              </a>
              <a
                href={`/teacher/test/delete/${test.id}`}
                class="bg-red-500 text-white text-center py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    max-width: 1200px;
  }

  @media (max-width: 640px) {
    .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .card {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
</style>
