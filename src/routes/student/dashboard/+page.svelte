<script>
  export let data; // Receive tests data from the load function
</script>

<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <div class="space-x-4">
      <a
        href="/student/logout"
        class="text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors">Logout</a>
    </div>
  </div>
</nav>

<main class="container mx-auto p-4">
  <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center">Student Dashboard</h1>

  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">Available Tests</h2>
    {#if data.tests.length === 0}
      <p class="text-center text-gray-500">No tests available.</p>
    {:else}
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.tests as test}
          <a
            href={`/student/test/${test.id}`}
            class="block bg-blue-500 text-white text-center py-4 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {test.title}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    max-width: 1200px;
  }
</style>
