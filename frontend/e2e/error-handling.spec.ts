import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
        await page.goto('/');

        // Try to create a note
        await page.click('text=New note...');
        await page.locator('input[placeholder*="My New Note"]').fill('Network Test');
        await page.locator('input[name="passphrase"]').fill('test-password');
        await page.locator('textarea').fill('Test content');

        // Simulate network failure
        await page.route('**/*', route => route.abort());

        // Should show error message
        await page.click('button:has-text("Create Note")');
        await expect(page.locator('text=Network Error')).toBeVisible();
        await expect(page.locator('text=An error occurred while creating the note.')).toBeVisible();

    });

    test('should display "Page Not Found" when navigating to non-existing note "hello"', async ({ page }) => {
        // Navigate to a non-existing note URL with ID "hello"
        await page.goto('/hello');

        // Verify the page title/heading
        await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();

        // Verify the error message text
        await expect(page.getByText("Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.")).toBeVisible();

        // Verify the "Go Home" button is present and visible
        await expect(page.getByText('Go Home')).toBeVisible();

        // Verify the "Go Back" button is present and visible
        await expect(page.getByText('Go Back')).toBeVisible();

        // Test that the Go Home button works
        await page.getByText('Go Home').click();
        await expect(page).toHaveURL('/');
    });
});