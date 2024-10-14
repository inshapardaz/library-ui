import { test, expect } from '@playwright/test';

test.describe('When user visits homepage', async () => {

    test('has title', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/nawistha/);
    });
});