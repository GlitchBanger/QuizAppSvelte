<script>
    // You can pass error information through props if needed
    export let errorMessage = "Something went wrong. Please try again later.";
  </script>
  
  <main>
    <div class="error-content">
      <h1>Error</h1>
      <p>{errorMessage}</p>
      <a href="/" class="home-link">Go to Homepage</a>
    </div>
  </main>
  
  <style>
    main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f2f2f2;
    }
  
    .error-content {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 0.375rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      font-size: 2.5rem;
      color: #e74c3c;
      margin-bottom: 1rem;
    }
  
    p {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 2rem;
    }
  
    .home-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 0.375rem;
      font-weight: bold;
      transition: background-color 0.3s;
    }
  
    .home-link:hover {
      background-color: #0056b3;
    }
  </style>
  