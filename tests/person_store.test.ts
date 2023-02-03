import { expect, test } from '@playwright/test';

test('add new person to the list', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('add_person').fill('Butch');
	await page.getByTestId('add_person-button').click();

	expect(await page.textContent('h3')).toBe('Osoby');
	expect(await page.textContent('li')).toBe('Butch');
	await page.getByTestId('add_person').fill('Mariolka');
	await page.keyboard.down('Enter');
	await page.getByTestId('add_person').fill('Zenek');
	await page.keyboard.down('Enter');
	await expect(page.getByRole('listitem')).toHaveCount(3);
	await expect(page.getByRole('listitem')).toHaveText(['Butch', 'Mariolka', 'Zenek']);
});
