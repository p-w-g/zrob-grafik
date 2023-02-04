<script lang="ts">
	export let LabelText = 'Missing Label';
	export let InputBinding: Date = new Date();
	export let testId: string = '';
</script>

<label for="">{LabelText}</label>
<input type="date" data-test-id={testId} bind:value={InputBinding} />
