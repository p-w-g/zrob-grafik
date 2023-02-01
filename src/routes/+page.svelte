<script>
	import LabeledDate from '../components/LabeledDate.svelte';
	import LabeledInput from '../components/LabeledInput.svelte';
</script>

<LabeledInput LabelText="Osoba" />
<button>Dodaj</button>
<LabeledInput LabelText="Godziny pracy" />
<button>Dodaj</button>
<LabeledDate LabelText="data OD" />
<LabeledDate LabelText="data DO" />
<button>Generuj</button>
