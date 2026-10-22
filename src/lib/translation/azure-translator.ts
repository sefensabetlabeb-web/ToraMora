import 'server-only';

const endpoint = (
  process.env.AZURE_TRANSLATOR_ENDPOINT ||
  'https://api.cognitive.microsofttranslator.com'
).replace(/\/+$/, '');

const region = process.env.AZURE_TRANSLATOR_REGION || '';
const key = process.env.AZURE_TRANSLATOR_KEY || '';

export type TranslatableSection = {
  title: string;
  description?: string;
};

export type TripTranslationSource = {
  title: string;
  eyebrow?: string | null;
  shortDescription: string;
  duration?: string | null;
  highlights?: unknown;
  itinerary?: unknown;
  included?: unknown;
  excluded?: unknown;
  whatToBring?: unknown;
  whatsappMessage?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type TranslatedTripContent = {
  title: string;
  eyebrow: string | null;
  shortDescription: string;
  duration: string | null;
  highlights: TranslatableSection[];
  itinerary: TranslatableSection[];
  included: string[];
  excluded: string[];
  whatToBring: string[];
  whatsappMessage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

function assertConfigured() {
  if (!key) {
    throw new Error('AZURE_TRANSLATOR_KEY is not configured.');
  }

  if (!region) {
    throw new Error('AZURE_TRANSLATOR_REGION is not configured.');
  }
}

async function translateTexts(
  texts: string[],
  targetLocale: string,
): Promise<string[]> {
  if (texts.length === 0) return [];

  assertConfigured();

  // AZURE_RETRY_V1
  let response: Response | undefined;
  for (let attempt = 0; attempt < 5; attempt++) {
    response = await fetch(
      `${endpoint}/translate?api-version=3.0&from=en&to=${encodeURIComponent(targetLocale)}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': region,
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(texts.map((Text) => ({Text}))),
        cache: 'no-store',
      },
    );
    if (response.status !== 429 || attempt === 4) break;
    const retryAfter = response.headers.get('Retry-After');
    const seconds = retryAfter ? Number(retryAfter) : NaN;
    const retryDate = retryAfter ? Date.parse(retryAfter) : NaN;
    const delay = Number.isFinite(seconds) && seconds >= 0
      ? seconds * 1000
      : Number.isFinite(retryDate)
        ? Math.max(0, retryDate - Date.now())
        : 2000 * (2 ** attempt);
    await new Promise<void>((resolve) => setTimeout(resolve, Math.min(Math.max(delay, 1000), 60000)));
  }
  if (!response) throw new Error('Azure Translator did not return a response.');
  if (!response.ok) {
    throw new Error(`Azure Translator failed (${response.status}).`);
  }
  const result = (await response.json()) as Array<{
    translations?: Array<{text?: string}>;
  }>;

  if (result.length !== texts.length) {
    throw new Error(
      'Azure Translator returned an unexpected number of translations.',
    );
  }

  return result.map((item, index) => {
    const translated = item.translations?.[0]?.text;

    if (typeof translated !== 'string') {
      throw new Error(
        `Azure Translator returned an invalid result at index ${index}.`,
      );
    }

    return translated;
  });
}

function asSections(value: unknown): TranslatableSection[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        !!item && typeof item === 'object' && !Array.isArray(item),
    )
    .map((item) => ({
      title: typeof item.title === 'string' ? item.title : '',
      ...(typeof item.description === 'string'
        ? {description: item.description}
        : {}),
    }))
    .filter((item) => item.title.trim().length > 0);
}

function asTextList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string =>
      typeof item === 'string' && item.trim().length > 0,
  );
}

export async function translateTripFromEnglish(
  source: TripTranslationSource,
  targetLocale: string,
): Promise<TranslatedTripContent> {
  if (targetLocale === 'en') {
    throw new Error(
      'English is the source language and must not be translated.',
    );
  }

  const highlights = asSections(source.highlights);
  const itinerary = asSections(source.itinerary);
  const included = asTextList(source.included);
  const excluded = asTextList(source.excluded);
  const whatToBring = asTextList(source.whatToBring);

  const values: string[] = [];

  const add = (value?: string | null) => {
    const index = values.length;
    values.push(value || '');
    return index;
  };

  const titleIndex = add(source.title);
  const eyebrowIndex = add(source.eyebrow);
  const shortDescriptionIndex = add(source.shortDescription);
  const durationIndex = add(source.duration);
  const whatsappIndex = add(source.whatsappMessage);
  const seoTitleIndex = add(source.seoTitle);
  const seoDescriptionIndex = add(source.seoDescription);

  const highlightIndexes = highlights.map((item) => ({
    title: add(item.title),
    description:
      item.description !== undefined ? add(item.description) : null,
  }));

  const itineraryIndexes = itinerary.map((item) => ({
    title: add(item.title),
    description:
      item.description !== undefined ? add(item.description) : null,
  }));

  const includedIndexes = included.map(add);
  const excludedIndexes = excluded.map(add);
  const bringIndexes = whatToBring.map(add);

  const nonEmpty = values
    .map((value, index) => ({value, index}))
    .filter(({value}) => value.trim().length > 0);

  const translatedValues = await translateTexts(
    nonEmpty.map(({value}) => value),
    targetLocale,
  );

  const translated = [...values];

  nonEmpty.forEach(({index}, translatedIndex) => {
    translated[index] = translatedValues[translatedIndex];
  });

  const nullable = (index: number): string | null =>
    translated[index]?.trim() || null;

  return {
    title: translated[titleIndex],
    eyebrow: nullable(eyebrowIndex),
    shortDescription: translated[shortDescriptionIndex],
    duration: nullable(durationIndex),

    highlights: highlightIndexes.map((indexes) => ({
      title: translated[indexes.title],
      ...(indexes.description === null
        ? {}
        : {description: translated[indexes.description]}),
    })),

    itinerary: itineraryIndexes.map((indexes) => ({
      title: translated[indexes.title],
      ...(indexes.description === null
        ? {}
        : {description: translated[indexes.description]}),
    })),

    included: includedIndexes.map((index) => translated[index]),
    excluded: excludedIndexes.map((index) => translated[index]),
    whatToBring: bringIndexes.map((index) => translated[index]),

    whatsappMessage: nullable(whatsappIndex),
    seoTitle: nullable(seoTitleIndex),
    seoDescription: nullable(seoDescriptionIndex),
  };
}
