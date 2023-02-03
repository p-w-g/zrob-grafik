<script lang="ts">
	import LabeledDate from '../components/LabeledDate.svelte';
	import LabeledInput from '../components/LabeledInput.svelte';

	$: person = '';

	import { people } from '../store';

	const addPerson = () => {
		people.update((prev) => (prev = [...prev, person]));
		person = '';
	};

	const removePerson = (person: string) => {
		people.update((prev) => prev.filter((p) => p !== person));
	};
</script>

<div class="grid-container">
	<div class="grid-admin_panel">
		<LabeledInput
			LabelText="Osoba"
			bind:InputBinding={person}
			callBackFn={() => addPerson()}
			testId="add_person"
		/>
		<LabeledInput LabelText="Godziny pracy" callBackFn={() => alert('TODO')} />
		<LabeledDate LabelText="data OD" />
		<LabeledDate LabelText="data DO" />
		<button>Generuj</button>
	</div>
	<div class="grid-sheet" />
	<div class="grid-list">
		{#if $people.length}
			<h3>Osoby</h3>
			<ul>
				{#each $people as person}
					<li>
						{person}
						<button data-test-id={`remove_this-${person}`} on:click={() => removePerson(person)}
							>usun</button
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
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
