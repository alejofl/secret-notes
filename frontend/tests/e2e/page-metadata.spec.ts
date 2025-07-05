import { test, expect } from '@playwright/test';

test.describe('Page Metadata and SEO', () => {
  test('should have correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Secret Notes');
  });

  test('should have correct meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = await page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      'A secure note-taking webapp for storing encrypted notes and retrieving them using a passphrase.'
    );
  });

  test('should have proper favicon', async ({ page }) => {
    await page.goto('/');
    const favicon = await page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', expect.stringContaining('favicon'));
  });

  test('should have viewport meta tag', async ({ page }) => {
    await page.goto('/');
    const viewport = await page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', expect.stringContaining('width=device-width'));
  });

  test('should have charset meta tag', async ({ page }) => {
    await page.goto('/');
    const charset = await page.locator('meta[charset]');
    await expect(charset).toHaveAttribute('charset', 'UTF-8');
  });
});