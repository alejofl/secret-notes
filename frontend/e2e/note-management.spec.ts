import { test, expect } from '@playwright/test';


test.describe.skip('Note Management', () => {
    test.beforeAll(async ({ browser, browserName }) => {
        const page = await browser.newPage();
        await page.goto('/');

        const browserTitle = `Test Management Note - ${browserName.charAt(0).toUpperCase() + browserName.slice(1)}`;

        // Create a test note once for all tests in this file
        await page.click('text=New note...');
        await page.locator('input[placeholder*="My New Note"]').fill(browserTitle);
        await page.locator('input[name="passphrase"]').fill('test-password');
        await page.locator('textarea').fill('This is a test note for management operations.');
        await page.click('button:has-text("Create Note")');

        await page.close();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display created notes in sidebar', async ({ page, browserName }) => {
        const browserTitle = `Test Management Note - ${browserName}`;

        await expect(page.locator(`text=${browserTitle}`)).toBeVisible();
    });

    test('should show protected note view when clicking on a note', async ({ page, browserName }) => {
        const browserTitle = `Test Management Note - ${browserName}`;
        await page.click(`text=${browserTitle}`);

        // Should show protected note interface
        await expect(page.locator('text=Protected Note')).toBeVisible();
        await expect(page.locator('text=Enter the passphrase to access this note')).toBeVisible();
        await expect(page.locator('input[placeholder*="Enter passphrase"]')).toBeVisible();
        await expect(page.locator('button:has-text("Access Note")')).toBeVisible();
    });

    test('should unlock note with correct passphrase', async ({ page, browserName }) => {
        const browserTitle = `Test Management Note - ${browserName}`;
        await page.click(`text=${browserTitle}`);

        // Enter correct passphrase
        await page.locator('input[placeholder*="Enter passphrase"]').fill('test-password');
        await page.click('button:has-text("Access Note")');

        // Should show the note contents
        await expect(page.locator('text=This is a test note for management operations.')).toBeVisible();
    });

    test('should show error with incorrect passphrase', async ({ page, browserName }) => {
        const browserTitle = `Test Management Note - ${browserName}`;
        await page.click(`text=${browserTitle}`);

        // Enter incorrect passphrase
        await page.locator('input[placeholder*="Enter passphrase"]').fill('wrong-password');
        await page.click('button:has-text("Access Note")');

        // Should show error message
        await expect(page.locator('text=Something went wrong! Check your passphrase.')).toBeVisible();
        // Should remain on protected note view
        await expect(page.locator('text=Protected Note')).toBeVisible();
    });

    test('should search notes by title', async ({ page, browserName }) => {
        const searchInput = page.locator('input[placeholder*="Search"]');
        await searchInput.fill('Test Management');

        const browserTitle = `Test Management Note - ${browserName}`;

        await expect(page.locator(`text=${browserTitle}`)).toBeVisible();

        // Search for non-existent note
        await searchInput.fill('Nonexistent');
        await expect(page.locator('text=Test Management Note')).not.toBeVisible();
    });

    test('should handle empty passphrase submission', async ({ page, browserName }) => {
        const browserTitle = `Test Management Note - ${browserName}`;
        await page.click(`text=${browserTitle}`);

        // Try to access without entering passphrase
        await page.click('button:has-text("Access Note")');

        // Should show validation error or remain on protected view
        await expect(page.locator('text=Protected Note')).toBeVisible();

    });

    test('should not store plaintext content in DOM', async ({ page, browserName }) => {
        await page.goto('/');

        const browserTitle = `Test Management Note - ${browserName}`;
        // Find encrypted note
        await page.click(`text=${browserTitle}`);

        // Check that sensitive data is not in page source
        const pageContent = await page.content();
        expect(pageContent).not.toContain('This is a test note for management operations.');
    });
});
