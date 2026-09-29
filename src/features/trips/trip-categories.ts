import type {TripCategory} from '@/types/trip';

export const tripCategories: {key: TripCategory; messageKey: 'culture'|'islands'|'diving'|'desert'|'family'|'private'}[] = [
  {key: 'culture', messageKey: 'culture'},
  {key: 'islands-snorkeling', messageKey: 'islands'},
  {key: 'diving-sea', messageKey: 'diving'},
  {key: 'desert-adventure', messageKey: 'desert'},
  {key: 'family-city', messageKey: 'family'},
  {key: 'private', messageKey: 'private'}
];

export function categoryMessageKey(category: TripCategory) {
  return tripCategories.find((item) => item.key === category)?.messageKey ?? 'family';
}
