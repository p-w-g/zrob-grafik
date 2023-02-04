<script lang="ts">
	import LabeledDate from '../components/LabeledDate.svelte';
	import LabeledInput from '../components/LabeledInput.svelte';

	$: person = '';
	$: date_from = new Date();
	$: date_to = new Date();

	import {
		people,
		month,
		date_from_timestamp,
		date_to_timestamp,
		days_in_period,
		nation_wide_days_off
	} from '../store';

	const addPerson = () => {
		people.update((prev) => (prev = [...prev, person]));
		person = '';
	};

	const removePerson = (person: string) => {
		people.update((prev) => prev.filter((p) => p !== person));
	};

	const removeAll = () => {
		$people = [];
	};

	const createShiftPeriod = () => {
		$date_from_timestamp = date_from;
		$date_to_timestamp = date_to;
		$days_in_period = new Date(date_to).getDate() - new Date(date_from).getDate() + 1;
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
		<LabeledDate LabelText="data OD" bind:InputBinding={date_from} />
		<LabeledDate LabelText="data DO" bind:InputBinding={date_to} />
		<button on:click={() => createShiftPeriod()}>Generuj</button>
	</div>
	<div class="grid-sheet">
		{#if !!$date_from_timestamp && !!$date_to_timestamp}
			<h3>Grafik na okres {$date_from_timestamp} - {$date_to_timestamp}</h3>
			<p>Ilosc dni kalendarzowych: {$days_in_period}</p>
		{/if}
	</div>
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
			<button data-test-id="remove-all" on:click={() => removeAll()}>usun wszystkich</button>
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
