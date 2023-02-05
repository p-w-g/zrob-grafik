<script lang="ts">
	import LabeledDate from '../components/LabeledDate.svelte';
	import LabeledInput from '../components/LabeledInput.svelte';
	import type { workday } from '../typings';

	$: person = '';
	$: shift = '';
	$: date_from = new Date();
	$: date_to = new Date();

	import {
		people,
		shifts,
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

	const createShift = (newShift: string) => {
		shifts.update((state) => (state = [...state, newShift]));
		shift = '';
	};

	const removeShift = (shift: string) => {
		shifts.update((state) => state.filter((s) => s !== shift));
	};

	const createPeriod = () => {
		$date_from_timestamp = date_from;
		$date_to_timestamp = date_to;
		const DD_TO = new Date(date_to).getDate();
		const MM_human_indexed = new Date(date_from).getMonth() + 1;
		const YY = new Date(date_from).getFullYear();
		const DD_FROM = new Date(date_from).getDate();

		$days_in_period = DD_TO - DD_FROM + 1;
		let workdays: workday[] = [];
		for (let index = 0; index < $days_in_period; index++) {
			const DD_Indexed = DD_FROM + index;
			const current_day = (DD_FROM + index).toString();
			const is_sunday = new Date(`${YY}, ${MM_human_indexed}, ${DD_Indexed}`).getDay() === 0;
			const day: workday = {
				day: current_day,
				shifts: $shifts,
				isDayOff: is_sunday
			};
			workdays.push(day);
		}
		month.update((state) => (state = [...state, ...workdays]));
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
		<LabeledInput
			LabelText="Godziny pracy"
			callBackFn={() => createShift(shift)}
			bind:InputBinding={shift}
			testId="add_shift"
		/>
		<LabeledDate LabelText="data OD" bind:InputBinding={date_from} />
		<LabeledDate LabelText="data DO" bind:InputBinding={date_to} />
		<button on:click={() => createPeriod()}>Generuj</button>
	</div>
	<div class="grid-sheet">
		{#if !!$date_from_timestamp && !!$date_to_timestamp && $month.length}
			<table>
				<thead>
					<tr>
						<th>
							Grafik na okres {$date_from_timestamp} - {$date_to_timestamp}
						</th>
					</tr>
					<tr>
						<td>
							Ilosc dni kalendarzowych: {$days_in_period}
						</td>
					</tr>
				</thead>
				<tbody>
					<th>Dzien miesiaca</th>
					{#each $month as date}
						<tr class:day-off={!!date.isDayOff}>
							<td>{date.day}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
	<div class="grid-list">
		{#if $shifts.length}
			<h3>Zmiany</h3>
			<ul>
				{#each $shifts as shift}
					<li>
						{shift}
						<button data-test-id={`remove_this-${shift}`} on:click={() => removeShift(shift)}
							>usun</button
						>
					</li>{/each}
			</ul>
		{/if}
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

	.day-off {
		background-color: #ff2c55;
	}
</style>
