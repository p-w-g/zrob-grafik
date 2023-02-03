<script>
	export let LabelText = 'Missing Label';
	export let InputBinding = '';
</script>

<label for="">{LabelText}</label>
<input type="text" bind:value={InputBinding} />
