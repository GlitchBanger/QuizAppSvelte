<script>
  import { Button } from "$lib/components/ui/button";
</script>

<div class="h-screen w-full flex items-center justify-center bg-gray-800">
  <div class="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
    <Button class="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg py-2 px-4">
      <a href="/teacher/login" class="block text-center">Login</a>
    </Button>
    <Button class="w-full bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none rounded-lg py-2 px-4">
      <a href="/teacher/signup" class="block text-center">Sign Up</a>
    </Button>
  </div>
</div>

<style>
  @media (max-width: 768px) {
    .button-container {
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .button-container {
      width: 100%;
    }
  }
</style>
