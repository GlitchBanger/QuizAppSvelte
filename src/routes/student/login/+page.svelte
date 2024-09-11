<script>
  import LoginForm from "$lib/components/custom/Student/LoginForm/LoginForm.svelte";
  export let data;
</script>

<div class="w-[100vw] h-[100vh] bg-blue-500 flex justify-center self-center">
  <LoginForm data={data.form} />
</div>
