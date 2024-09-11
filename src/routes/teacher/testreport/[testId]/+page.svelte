
<script>
    import ChevronLeft from "lucide-svelte/icons/chevron-left";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import { mediaQuery } from "svelte-legos";

    export let data;
  
    let { testResponses } = data;
    let totalPages = 1;
    let currentPage = 1;
    let error = "";
  
    const isDesktop = mediaQuery("(min-width: 768px)");
  
    // Pagination variables
    let perPage;
    let siblingCount;
  
    // Dynamically set perPage and siblingCount based on screen size
    $: perPage = isDesktop ? 10 : 5;
    $: siblingCount = isDesktop ? 1 : 0;
  
    // Compute paginated test responses based on current page, items per page, and total pages
    $: paginatedResponses = testResponses; // Assuming the API already handles pagination
  
    // Update the count dynamically based on filtered test responses
    $: count = testResponses.length;
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
    <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center">Test Responses</h1>
  
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">List of Test Responses</h2>
  
      {#if error}
        <p class="text-center text-gray-500">{error}</p>
      {:else}
        <!-- Display Test Responses in a Table -->
        <Table.Root>
          <Table.Caption>A list of responses for the selected test.</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[100px]">Response ID</Table.Head>
              <Table.Head>Student Name</Table.Head>
              <Table.Head class="text-right">Correct</Table.Head>
              <Table.Head class="text-right">Total Questions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each paginatedResponses as response}
              <Table.Row>
                <Table.Cell class="font-medium">{response.id}</Table.Cell>
                <Table.Cell>{response.studentName}</Table.Cell>
                <Table.Cell class="text-right">{response.correct}</Table.Cell>
                <Table.Cell class="text-right">{response.totalQuestions}</Table.Cell>
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
  