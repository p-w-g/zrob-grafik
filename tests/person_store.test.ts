import { expect, test } from '@playwright/test';

test('add new person to the list', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('add_person').fill('Butch');
	await page.getByTestId('add_person-button').click();

	expect(await page.textContent('h3')).toBe('Osoby');
	expect(await page.innerText('li')).toBe('Butch usun');
	await page.getByTestId('add_person').fill('Mariolka');
	await page.keyboard.down('Enter');
	await page.getByTestId('add_person').fill('Zenek');
	await page.keyboard.down('Enter');
	await expect(page.getByRole('listitem')).toHaveCount(3);
	await expect(page.getByRole('listitem')).toHaveText([
		'Butch usun',
		'Mariolka usun',
		'Zenek usun'
	]);
});

test('remove people from list', async ({ page }) => {
	const the_group = ['Komatsu', 'Rog', 'Jocke', 'Zbychu', 'Tomas'];

	await page.goto('/');

	for (let index = 0; index < the_group.length; index++) {
		const element = the_group[index];
		await page.getByTestId('add_person').fill(element);
		await page.getByTestId('add_person-button').click();
	}
	await expect(page.getByRole('listitem')).toHaveText([
		'Komatsu usun',
		'Rog usun',
		'Jocke usun',
		'Zbychu usun',
		'Tomas usun'
	]);
	await expect(page.getByRole('listitem')).toHaveCount(5);

	await page.getByTestId('remove_this-Jocke').click();
	await expect(page.getByRole('listitem')).toHaveCount(4);
	await expect(page.getByRole('listitem')).toHaveText([
		'Komatsu usun',
		'Rog usun',
		'Zbychu usun',
		'Tomas usun'
	]);

	await page.getByTestId('remove_this-Komatsu').click();
	await page.getByTestId('remove_this-Rog').click();
	await expect(page.getByRole('listitem')).toHaveCount(2);
	await expect(page.getByRole('listitem')).toHaveText(['Zbychu usun', 'Tomas usun']);
});
