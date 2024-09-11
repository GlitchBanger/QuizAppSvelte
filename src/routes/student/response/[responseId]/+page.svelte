<script>
  import { Button } from "$lib/components/ui/button";

  // You can define the route where the button will navigate.
  export let data // Adjust this to the first question route.
</script>

<div class="flex items-center justify-center h-screen">
  <a href="/student/response/{data.responseId}/question/{data.questionId}">
    <Button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
      Take Test
    </Button>
  </a>
</div>

<style>
  a {
    text-decoration: none;
  }
</style>
