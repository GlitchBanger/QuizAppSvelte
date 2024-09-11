<script>
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import * as Pagination from "$lib/components/ui/pagination/index.js";
  import { mediaQuery } from "svelte-legos";
  import * as Table from "$lib/components/ui/table/index.js";

  // Import the data containing the tests
  export let data; // Data is passed as a prop

  const isDesktop = mediaQuery("(min-width: 768px)");

  // Pagination variables
  let perPage;
  let siblingCount;
  let currentPage = 1; // Start with page 1
  let searchQuery = ""; // Search query for filtering tests

  // Dynamically set perPage and siblingCount based on screen size
  $: perPage = isDesktop ? 3 : 8;
  $: siblingCount = isDesktop ? 1 : 0;

  // Filter tests based on the search query
  $: filteredTests = data.tests.filter(test => 
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute paginated tests based on current page, items per page, and filtered data
  $: paginatedTests = filteredTests.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Update the count dynamically based on filtered tests
  $: count = filteredTests.length;
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
  <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center">Teacher Dashboard</h1>

  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">List of Tests</h2>

    <!-- Search Box -->
    <div class="mb-4">
      <input
        type="text"
        class="border rounded px-4 py-2 w-full"
        placeholder="Search by test title..."
        bind:value={searchQuery}
      />
    </div>

    {#if paginatedTests.length === 0}
      <p class="text-center text-gray-500">No tests available.</p>
    {:else}
      <!-- Display Tests in a Table -->
      <Table.Root>
        <Table.Caption>A list of your tests.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">Test ID</Table.Head>
            <Table.Head>Title</Table.Head>
            <Table.Head class="text-right">Edit</Table.Head>
            <Table.Head class="text-right">Delete</Table.Head>
            <Table.Head class="text-right">Responses</Table.Head> <!-- New Column -->
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each paginatedTests as test}
            <Table.Row>
              <Table.Cell class="font-medium">{test.id}</Table.Cell>
              <Table.Cell>{test.title}</Table.Cell>
              <Table.Cell class="text-right">
                <a target="_blank" href={`/teacher/test/${test.id}`} class="text-blue-500 hover:underline">Edit</a>
              </Table.Cell>
              <Table.Cell class="text-right">
                <a target="_blank" href={`/teacher/test/delete/${test.id}`} class="text-red-500 hover:underline">Delete</a>
              </Table.Cell>
              <Table.Cell class="text-right"> <!-- New Cell -->
                <a target="_blank" href={`/teacher/testreport/${test.id}`} class="text-green-500 hover:underline">View Responses</a>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>

      <!-- Pagination Component -->
      <Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage>
        <Pagination.Content class="mt-6 flex justify-center">
          <Pagination.Item>
            <Pagination.PrevButton>
              <ChevronLeft class="h-4 w-4" />
              <span class="hidden sm:block">Previous</span>
            </Pagination.PrevButton>
          </Pagination.Item>

          {#each pages as page (page.key)}
            {#if page.type === "ellipsis"}
              <Pagination.Item>
                <Pagination.Ellipsis />
              </Pagination.Item>
            {:else}
              <Pagination.Item>
                <Pagination.Link {page} isActive={currentPage === page.value}>
                  {page.value}
                </Pagination.Link>
              </Pagination.Item>
            {/if}
          {/each}

          <Pagination.Item>
            <Pagination.NextButton>
              <span class="hidden sm:block">Next</span>
              <ChevronRight class="h-4 w-4" />
            </Pagination.NextButton>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination.Root>
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
</style>
