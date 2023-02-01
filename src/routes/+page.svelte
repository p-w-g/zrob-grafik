<script>
	import LabeledDate from '../components/LabeledDate.svelte';
	import LabeledInput from '../components/LabeledInput.svelte';
</script>

<div class="grid-container">
	<div class="grid-admin_panel">
		<LabeledInput LabelText="Osoba" />
		<button>Dodaj</button>
		<LabeledInput LabelText="Godziny pracy" />
		<button>Dodaj</button>
		<LabeledDate LabelText="data OD" />
		<LabeledDate LabelText="data DO" />
		<button>Generuj</button>
	</div>
	<div class="grid-sheet" />
	<div class="grid-list" />
	<div class="grid-sheet_actions" />
</div>

<style>
	:global(body) {
		box-sizing: border-box;
		background-color: #e1e1e1;
	}
	.grid-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(10, 1fr);
		grid-column-gap: 5px;
		grid-row-gap: 5px;
		min-height: 95vh;
	}

	.grid-admin_panel {
		grid-area: 1 / 1 / 2 / 6;
		justify-self: center;
		align-self: center;
	}
	.grid-sheet {
		grid-area: 2 / 1 / 10 / 5;
	}
	.grid-list {
		grid-area: 2 / 5 / 10 / 6;
	}
	.grid-sheet_actions {
		grid-area: 10 / 1 / 11 / 6;
	}
</style>
