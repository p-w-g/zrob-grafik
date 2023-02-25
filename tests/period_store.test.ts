import { expect, test } from '@playwright/test';

test('render correct number of days', async ({ page }) => {
	await page.goto('/');

	await page.getByTestId('select-date-from').fill('2023-02-13');
	await page.getByTestId('select-date-to').fill('2023-02-27');
	await page.getByTestId('dates-letsgo').click();

	await expect(page.getByRole('cell')).toHaveCount(19);
});

test('render correct day labels in schedule', async ({ page }) => {
	await page.goto('/');

	// select from a middle of the month, select like a week after; days in first column should begin at the day from
});
