import {expect, test} from '@playwright/test';

test('unauthenticated admin access is redirected to the secure login page', async ({page}) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByRole('heading', {name: 'Admin sign in'})).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
});
