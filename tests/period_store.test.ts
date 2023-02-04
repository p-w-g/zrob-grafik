import { expect, test } from '@playwright/test';

test('render right amount of days', async ({ page }) => {
	await page.goto('/');

	// select one month, select another month for feb it should be 28 days unless leap year
});
