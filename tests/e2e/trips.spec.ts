import {expect, test} from '@playwright/test';

test('the trips page shows key Hurghada products without overwhelming navigation', async ({page}) => {
  await page.goto('/trips');
  await expect(page.getByText('Orange Bay', {exact: true}).first()).toBeVisible();
  await expect(page.getByText('Hula Hula Island', {exact: true}).first()).toBeVisible();
  await expect(page.getByText(/Diving/i).first()).toBeVisible();
});

test('a dynamic trip route renders itinerary and booking actions', async ({page}) => {
  await page.goto('/trips/orange-bay');
  await expect(page.getByRole('heading', {name: /Orange Bay/i}).first()).toBeVisible();
  await expect(page.getByText('Itinerary', {exact: true}).first()).toBeVisible();
  await expect(page.getByRole('link', {name: /Book/i}).first()).toBeVisible();
});
