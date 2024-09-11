<script>
  import AddTestForm from "$lib/components/custom/Teacher/AddTestForm/AddTestForm.svelte";

  
    export let data;
  </script>
  
  <div class="w-[100vw] h-[100vh] bg-orange-500 flex justify-center self-center">
    <AddTestForm data={data.form} />
  </div>
  