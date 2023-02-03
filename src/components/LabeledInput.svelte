<script lang="ts">
	export let LabelText: string = 'Missing Label';
	export let InputBinding: string = '';
	export let callBackFn: () => void;
	export let testId: string = '';
</script>

<form action="">
	<label for="">{LabelText}</label>
	<input data-test-id={testId} type="text" bind:value={InputBinding} />
	<button data-test-id={`${testId}-button`} on:click={() => callBackFn()}>Dodaj</button>
</form>
