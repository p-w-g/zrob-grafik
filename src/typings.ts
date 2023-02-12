export interface workday {
	day?: string;
	shifts?: Ishift[];
	isDayOff?: boolean;
}

export interface Ishift {
	[key: string]: string;
}
