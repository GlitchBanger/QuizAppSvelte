<script>
  // This script tag can be used to fetch data or handle any logic,
  // but for now, we just display the message "Test is finished"
  export let data;
</script>

<main>
  <div class="content">
    <h1>Test is finished <strong>Score: {data.answeredCorrect}/{data.totalResponse}</strong></h1>
    <a href="/student/dashboard" class="dashboard-link">Go to Dashboard</a>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
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
</style>
