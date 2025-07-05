import { test, expect } from '@playwright/test';

test.describe('Note Creation', () => {
  test.skip('should create a new note with title and content', async ({ page, browserName }) => {
    await page.goto('/');
    const browserTitle = `Test Note Title - ${browserName}`;

    // Click new note button
    await page.click('text=New note...');
    
    // Fill in note details
    const titleInput = page.locator('input[placeholder*="My New Note"]');
    await titleInput.fill(browserTitle);
    
    const passphraseInput = page.locator('input[name="passphrase"]');
    await passphraseInput.fill('secure-password-123');
    
    const contentArea = page.locator('textarea');
    await contentArea.fill('This is my secret note content that should be encrypted.');
    
    // Save the note
    await page.click('button:has-text("Create Note")');
    
    // Verify note appears in the list
    await expect(page.locator(`text=${browserTitle}`)).toBeVisible();
  });

  test('should require passphrase for note creation', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=New note...');
    
    const titleInput = page.locator('input[placeholder*="My New Note"]');
    await titleInput.fill('Test Note');
    
    const contentArea = page.locator('textarea');
    await contentArea.fill('Test content');
    
    // Try to save without passphrase
    await page.click('button:has-text("Create Note")');
    
    // Should show validation error
    await expect(page.locator('text=String must contain at least 8 character(s)')).toBeVisible();
  });

  test('should show passphrase security hint', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=New note...');
    
    // Check for passphrase hint text
    await expect(page.locator('text=Remember and store this value securely. It will be used as the key to encrypt your content.')).toBeVisible();
  });

});