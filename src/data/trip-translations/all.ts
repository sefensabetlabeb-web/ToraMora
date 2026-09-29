import {coreTripTranslations} from './core';
import {extendedTripTranslations} from './extended';
import {remainingTripTranslations} from './remaining';

export const bundledTripTranslations = [
  ...coreTripTranslations,
  ...extendedTripTranslations,
  ...remainingTripTranslations
];

export function findBundledTripTranslation(slug:string,locale:string){
  return bundledTripTranslations.find((item)=>item.slug===slug&&item.locale===locale);
}
