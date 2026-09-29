import {expect, test} from '@playwright/test';

test('homepage exposes the simple primary journey', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', {name: /Explore Egypt/i})).toBeVisible();
  await expect(page.getByRole('link', {name: /View all trips/i})).toBeVisible();
  await expect(page.getByRole('link', {name: /Book Now/i}).first()).toBeVisible();
});

test('mobile navigation opens without horizontal overflow', async ({page}, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Mobile-only navigation check');
  await page.goto('/');
  await page.getByRole('button', {name: 'Open menu'}).click();
  await expect(page.getByRole('navigation').last()).toBeVisible();
  await expect(page.getByRole('link', {name: 'Trips'}).last()).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});

test('language selection preserves the page while changing locale', async ({page}) => {
  await page.goto('/trips/cairo');
  await page.getByRole('button', {name: /Choose language/i}).first().click();
  await page.getByRole('button', {name: /Deutsch de/i}).click();
  await expect(page).toHaveURL(/\/de\/trips\/cairo/);
});
