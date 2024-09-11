<script>
  import { Button } from "$lib/components/ui/button";
</script>

<style>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1f2937; /* Dark gray background */
  padding: 20px; /* Padding to ensure content doesn't touch edges */
  box-sizing: border-box; /* Include padding in width/height */
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Space between buttons */
}

.button {
  padding: 12px 24px;
  text-decoration: none; /* Remove underline from links */
  border-radius: 4px;
  transition: background-color 0.2s, box-shadow 0.2s;
  font-size: 1rem;
}

.button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-button {
  background-color: #3b82f6; /* Blue color */
  color: white;
}

.signup-button {
  background-color: #f97316; /* Orange color */
  color: white;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }

  .button-container {
    flex-direction: column; /* Stack buttons vertically on smaller screens */
    gap: 10px; /* Reduced space between buttons */
  }
}

@media (max-width: 480px) {
  .button {
    padding: 10px 20px; /* Adjust padding for smaller screens */
    font-size: 0.9rem;
  }
}
</style>

<div class="container">
<div class="button-container">
  <Button class="button login-button">
    <a href="student/login">Login</a>
  </Button>
  <Button class="button signup-button">
    <a href="student/signup">Sign Up</a>
  </Button>
</div>
</div>
