<script>
  import SignUpForm from "$lib/components/custom/Teacher/SignUpForm/SignUpForm.svelte";

  export let data;
</script>

<div class="w-[100vw] h-[100vh] bg-orange-500 flex justify-center self-center">
  <SignUpForm data={data.form} />
</div>
