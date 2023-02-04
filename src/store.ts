import { writable } from 'svelte/store';

export const people = writable<string[]>([]);

export const month = writable([{}]);
export const date_from_timestamp = writable();
export const date_to_timestamp = writable();
export const days_in_period = writable<number>();
export const nation_wide_days_off = writable();
