import { test, expect } from '@playwright/test';

test.describe('Projects Dashboard', () => {
  test('should load the dashboard and display the title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Project Validator System');
  });

  test('should open add project modal', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Adicionar Novo Projeto"');
    await expect(page.locator('text="Novo Projeto"')).toBeVisible();
  });
});
