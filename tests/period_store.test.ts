import { expect, test } from '@playwright/test';

test('render correct number of days', async ({ page }) => {
	await page.goto('/');

	// select one month, select another month for feb it should be 28 days unless leap year
});

test('render correct day labels in schedule', async ({ page }) => {
	await page.goto('/');

	// select from a middle of the month, select like a week after; days in first column should begin at the day from
});
