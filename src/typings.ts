export interface workday {
	day?: string;
	shifts?: shift[];
	isDayOff?: boolean;
}

export interface shift {
	[key: string]: string;
}
