<style>
    .container {
      height: 100vh;
      width: 100%; /* Full width on all screens */
      background-color: #f97316; /* Orange color */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; /* Center horizontally */
      padding: 20px; /* Padding to avoid edge issues */
      box-sizing: border-box; /* Include padding in width/height */
    }
  
    .heading {
      color: white;
      text-align: center;
      font-size: 2rem; /* Default font size */
      margin: 0; /* Remove default margin */
    }
  
    @media (max-width: 768px) {
      .heading {
        font-size: 1.5rem; /* Smaller font size for medium screens */
      }
    }
  
    @media (max-width: 480px) {
      .heading {
        font-size: 1.25rem; /* Even smaller font size for small screens */
      }
    }
  </style>
  
  <div class="container">
    <h1 class="heading">Welcome to your Quiz app</h1>
  </div>
  