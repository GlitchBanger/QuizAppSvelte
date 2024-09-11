<script>
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import * as Pagination from "$lib/components/ui/pagination/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { mediaQuery } from "svelte-legos";

  // Import the data containing the test results and answer key
  export let data; // Data is passed as a prop

  const isDesktop = mediaQuery("(min-width: 768px)");

  // Pagination variables for answer key
  let count = data.answerKey.length; // Total number of answers
  let perPage;
  let siblingCount;
  let currentPage = 1; // Start with page 1

  // Dynamically set perPage and siblingCount based on screen size
  $: perPage = isDesktop ? 5 : 10;
  $: siblingCount = isDesktop ? 1 : 0;

  // Compute paginated answerKey based on current page and items per page
  $: paginatedAnswerKey = data.answerKey.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Update the count dynamically based on the total number of answers
  $: count = data.answerKey.length;
</script>

<main>
  <div class="content">
    <h1>
      Test is finished <strong>Score: {data.answeredCorrect}/{data.totalResponse}</strong>
    </h1>
    
    <div class="table-container">
      <h2>Answer Key</h2>
      
      {#if paginatedAnswerKey.length === 0}
        <p class="text-center text-gray-500">No answer key available.</p>
      {:else}
        <!-- Display Answer Key in a Table -->
        <Table.Root>
          <Table.Caption>Answer key for the test questions.</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[100px]">Question ID</Table.Head>
              <Table.Head>Question Text</Table.Head>
              <Table.Head class="text-right">Correct Option</Table.Head>
              <Table.Head class="text-right">Selected Option</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each paginatedAnswerKey as item}
              <Table.Row>
                <Table.Cell class="font-medium">{item.questionId}</Table.Cell>
                <Table.Cell>{item.questionText}</Table.Cell>
                <Table.Cell class="text-right">{item.correctOption}</Table.Cell>
                <Table.Cell class="text-right">{item.selectedOption || 'N/A'}</Table.Cell>
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

    <a href="/student/dashboard" class="dashboard-link">Go to Dashboard</a>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #f9f9f9;
  }

  .content {
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    color: #333;
  }

  .table-container {
    margin-top: 2rem;
    width: 100%;
  }

  .dashboard-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 0.375rem;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .dashboard-link:hover {
    background-color: #0056b3;
  }

  /* Table Styles */
  Table.Root {
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
  }

  Table.Head, Table.Cell {
    padding: 0.75rem;
    border: 1px solid #ddd;
  }

  Table.Head {
    background-color: #f4f4f4;
  }

  Table.Caption {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }
</style>
