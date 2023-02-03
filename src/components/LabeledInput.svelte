<script lang="ts">
	export let LabelText: string = 'Missing Label';
	export let InputBinding: string = '';
	export let callBackFn: () => void;
</script>

<form action="">
	<label for="">{LabelText}</label>
	<input type="text" bind:value={InputBinding} />
	<button on:click={() => callBackFn()}>Dodaj</button>
</form>
