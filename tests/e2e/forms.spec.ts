import {expect, test} from '@playwright/test';

test('contact form exposes the expected traveller fields', async ({page}) => {
  await page.goto('/contact');
  await expect(page.getByLabel('Name')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Phone')).toBeVisible();
  await expect(page.getByLabel('Hotel Name')).toBeVisible();
  await expect(page.getByLabel('Message')).toBeVisible();
  await expect(page.getByRole('button', {name: 'Send Message'})).toBeVisible();
});

test('booking form can preload a trip from the query string', async ({page}) => {
  await page.goto('/book?trip=orange-bay');
  await expect(page.getByLabel('Trip')).toHaveValue('orange-bay');
  await expect(page.getByLabel('Preferred Date')).toBeVisible();
  await expect(page.getByLabel('Adults')).toBeVisible();
  await expect(page.getByLabel('Hotel Name')).toBeVisible();
  await expect(page.getByRole('button', {name: 'Send Booking Request'})).toBeVisible();
});
