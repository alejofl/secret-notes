import { test, expect } from '@playwright/test';

test.describe('App Layout and Navigation', () => {
    test('should display main app title', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('text=Secret Notes')).toBeVisible();
    });

    test('should display new note button', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('text=New note...')).toBeVisible();
    });

    test('should display notes section', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('[data-sidebar="group-label"]:has-text("Notes")')).toBeVisible();
    });

    test('should display search functionality', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    });
});