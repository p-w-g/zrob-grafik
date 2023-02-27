import { writable } from 'svelte/store';
import type { Ishift, workday } from './typings';

export const people = writable<string[]>([]);

export const shifts = writable<string[]>([]);

export const month = writable<workday[]>([]);
export const date_from_timestamp = writable();
export const date_to_timestamp = writable();
export const days_in_period = writable<number>();
export const nation_wide_days_off = writable();
