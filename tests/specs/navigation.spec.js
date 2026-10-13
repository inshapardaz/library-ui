import { test, expect } from '@playwright/test';
import { mockApi, signedInUser } from '../support/mockApi';
//--------------------------------

test.describe('Public browsing', () => {
    test('an anonymous visitor can open a library home without being sent to login', async ({ page }) => {
        await mockApi(page);
        await page.goto('/libraries/1');

        await expect(page).toHaveURL(/\/libraries\/1$/);
        await expect(page.getByText('Sign in to pick up where you left off', { exact: false })).toBeVisible();
    });

    test('Explore is public and keeps the active tab in the URL', async ({ page }) => {
        await mockApi(page);
        await page.goto('/libraries/1/explore/poetry');

        await expect(page.getByRole('tab', { name: 'Poetry' })).toHaveAttribute('aria-selected', 'true');
        await page.getByRole('tab', { name: 'Authors' }).click();
        await expect(page).toHaveURL(/\/libraries\/1\/explore\/authors$/);
    });
});

test.describe('Login required to read', () => {
    test('a direct reader URL sends an anonymous visitor to the main site login', async ({ page }) => {
        await mockApi(page);
        await page.goto('/libraries/1/books/5/read');

        await expect(page).toHaveURL(/localhost:4200\/account\/login\?returnUrl=/);
    });

    test('My Library needs a login', async ({ page }) => {
        await mockApi(page);
        await page.goto('/libraries/1/my/favorites');

        await expect(page).toHaveURL(/localhost:4200\/account\/login/);
    });

    test('My Library opens for a signed-in reader', async ({ page }) => {
        await mockApi(page, { user: signedInUser });
        await page.goto('/libraries/1/my');

        await expect(page).toHaveURL(/\/libraries\/1\/my\/continue$/);
        await expect(page.getByRole('tab', { name: 'Favorites' })).toBeVisible();
    });

    test('poetry is readable anonymously only when the library allows it', async ({ page }) => {
        await mockApi(page, { library: { allowPublicAccessToWritings: true } });
        await page.goto('/libraries/1/poetry/5');
        await expect(page).toHaveURL(/\/libraries\/1\/poetry\/5$/);
    });

    test('poetry needs login when the flag is off', async ({ page }) => {
        await mockApi(page, { library: { allowPublicAccessToWritings: false } });
        await page.goto('/libraries/1/poetry/5');
        await expect(page).toHaveURL(/localhost:4200\/account\/login/);
    });
});

test.describe('Legacy URLs', () => {
    test('the old books list keeps its filters in Explore', async ({ page }) => {
        await mockApi(page);
        await page.goto('/libraries/1/books?category=7');
        await expect(page).toHaveURL(/\/libraries\/1\/explore\/books\?category=7$/);
    });

    test('the old favorites filter lands in My Library', async ({ page }) => {
        await mockApi(page, { user: signedInUser });
        await page.goto('/libraries/1/books?favorite=true');
        await expect(page).toHaveURL(/\/libraries\/1\/my\/favorites\?type=books$/);
    });
});

test.describe('Library selection', () => {
    test('a single library opens directly from the site root', async ({ page }) => {
        await mockApi(page);
        await page.goto('/');
        await expect(page).toHaveURL(/\/libraries\/1$/);
    });

    test('several libraries show the picker when none is remembered', async ({ page }) => {
        await mockApi(page, { libraries: [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }] });
        await page.goto('/');
        await expect(page).toHaveURL(/localhost:\d+\/$/);
    });

    test('the remembered library is opened when there are several', async ({ page }) => {
        await mockApi(page, { libraries: [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }] });
        await page.addInitScript(() => window.localStorage.setItem('lastLibraryId', '2'));
        await page.goto('/');
        await expect(page).toHaveURL(/\/libraries\/2$/);
    });
});

test.describe('Private libraries', () => {
    test('an anonymous visitor is asked to sign in', async ({ page }) => {
        await mockApi(page, { libraryStatus: 403 });
        await page.goto('/libraries/1');
        await expect(page.getByRole('heading', { name: 'Sign in to continue' })).toBeVisible();
    });

    test('a signed-in non-member sees the 403 page', async ({ page }) => {
        await mockApi(page, { libraryStatus: 403, user: signedInUser });
        await page.goto('/libraries/1');
        await expect(page.getByText('403', { exact: true })).toBeVisible();
    });
});

test.describe('Responsive shell', () => {
    test('phones get a bottom tab bar and no horizontal scroll', async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 640 });
        await mockApi(page);
        await page.goto('/libraries/1');

        const tabs = page.getByRole('navigation', { name: 'Main navigation' }).last();
        await expect(tabs.getByText('Explore')).toBeVisible();
        await expect(tabs.getByText('My Library')).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
    });

    test('desktop has no bottom tab bar', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await mockApi(page);
        await page.goto('/libraries/1');
        await expect(page.getByRole('link', { name: 'Explore' }).first()).toBeVisible();
        await expect(page.locator('nav[aria-label="Main navigation"]:visible')).toHaveCount(1);
    });

    test('the reader pages have no tab bar', async ({ page }) => {
        await page.setViewportSize({ width: 360, height: 640 });
        await mockApi(page, { user: signedInUser });
        await page.goto('/libraries/1/books/5/read');
        await expect(page.locator('nav[aria-label="Main navigation"]:visible')).toHaveCount(0);
    });

    test('Urdu is right to left and keeps the tab bar', async ({ page }) => {
        await page.setViewportSize({ width: 360, height: 640 });
        await mockApi(page, { english: false });
        await page.addInitScript(() => window.localStorage.setItem('i18nextLng', 'ur'));
        await page.goto('/libraries/1');
        await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
        await expect(page.locator('nav[aria-label]:visible').last()).toBeVisible();
    });
});

test.describe('Book detail', () => {
    test('an anonymous visitor sees "Sign in to read" and the detail tabs', async ({ page }) => {
        await mockApi(page);
        await page.goto('/libraries/1/books/5');

        await expect(page.getByRole('heading', { name: 'Test Book' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign in to read' }).or(page.getByRole('link', { name: 'Sign in to read' }))).toBeVisible();
        await expect(page.getByRole('tab', { name: 'About' })).toBeVisible();
        await expect(page.getByRole('tab', { name: 'Contents' })).toBeVisible();

        await page.getByRole('tab', { name: 'Related' }).click();
        await expect(page).toHaveURL(/tab=related/);
    });

    test('a signed-in reader gets the Read action', async ({ page }) => {
        await mockApi(page, { user: signedInUser });
        await page.goto('/libraries/1/books/5');

        await expect(page.getByRole('button', { name: 'Read book' })).toBeVisible();
        await expect(page.getByText('Sign in to read')).toHaveCount(0);
    });

    test('the primary action is above the fold on a small phone', async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 640 });
        await mockApi(page);
        await page.goto('/libraries/1/books/5');

        const action = page.getByText('Sign in to read').first();
        await expect(action).toBeVisible();
        const box = await action.boundingBox();
        expect(box.y + box.height).toBeLessThan(640);
    });

    test('the share and favorite actions are present for anonymous visitors', async ({ page }) => {
        await mockApi(page);
        await page.goto('/libraries/1/books/5');
        await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign in to use this feature' }).first()).toBeVisible();
    });
});

test.describe('Signed-out actions', () => {
    test('pressing favorite sends an anonymous visitor to login', async ({ page }) => {
        await mockApi(page);
        await page.goto('/libraries/1/books/5');
        await page.getByRole('button', { name: 'Sign in to use this feature' }).first().click();
        await expect(page).toHaveURL(/localhost:4200\/account\/login\?returnUrl=/);
    });
});

test.describe('Tablet shell', () => {
    test('at 768px the header navigation shows and the tab bar does not', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 900 });
        await mockApi(page);
        await page.goto('/libraries/1');
        await expect(page.getByRole('link', { name: 'Explore' }).first()).toBeVisible();
        await expect(page.locator('nav[aria-label="Main navigation"]:visible')).toHaveCount(1);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
    });
});
