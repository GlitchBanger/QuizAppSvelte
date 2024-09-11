<!-- src/routes/+page.svelte -->
<main class="h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-3xl font-bold mb-8">Welcome to the Quiz App</h1>
  
    <div class="space-y-4">
      <a
        href="/teacher"
        class="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
      >
        Teacher Dashboard
      </a>
  
      <a
        href="/student"
        class="px-6 py-3 bg-green-500 text-white text-lg rounded hover:bg-green-600"
      >
        Student Dashboard
      </a>
    </div>
  </main>
  
  <style>
    main {
      font-family: sans-serif;
    }
  </style>
  