<script>
  import QuestionResponseForm from "$lib/components/custom/Student/QuestionResponseForm/QuestionResponseForm.svelte";
    export let data
</script>
<QuestionResponseForm data={data.form} question={data.question}/>