import {describe, expect, it} from 'vitest';
import {normalizeSearchText, tripMatchesQuery} from '@/features/trips/search';
import type {Trip} from '@/types/trip';

const trip: Trip = {
  id:'1',slug:'test',title:'Schnuppertauchen',shortDescription:'Delfine und klares Wasser im Roten Meer',duration:'Ganztägig',priceFrom:50,currency:'USD',priceMode:'sample',image:'/x.svg',category:'diving-sea',categoryLabel:'Tauchen',status:'published',sortOrder:1,eyebrow:'Aus Hurghada',heroImage:{src:'/x.svg',alt:'Tauchen'},gallery:[],highlights:[{title:'Unterwasserwelt',description:'Riffe entdecken'}],itinerary:[{title:'Hotelabholung'}],included:['Ausrüstung'],excluded:['Persönliche Ausgaben'],whatToBring:['Handtuch'],whatsappMessage:'',seo:{title:'',description:''}
};

describe('multilingual trip search',()=>{
  it('normalizes accents and casing',()=>expect(normalizeSearchText('ÄGYPTEN','de')).toBe('agypten'));
  it('matches German localized content',()=>expect(tripMatchesQuery(trip,'tauchen','de','Tauchen & Meer')).toBe(true));
  it('matches multiple tokens across fields',()=>expect(tripMatchesQuery(trip,'delfine wasser','de','Tauchen & Meer')).toBe(true));
  it('supports Turkish locale casing',()=>expect(normalizeSearchText('İSTANBUL','tr')).toBe('istanbul'));
  it('supports Cyrillic text',()=>expect(normalizeSearchText('ДЕЛЬФИНЫ','ru')).toBe('дельфины'));
  it('returns false for unrelated terms',()=>expect(tripMatchesQuery(trip,'pyramiden','de','Tauchen & Meer')).toBe(false));
});
