import { Country } from "./country";
import { Region } from "./region.type";

export interface CacheStore{
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: RegionCounutries;
}

export interface TermCountries{
  term:string,
  countries: Country[]
};

export interface RegionCounutries{
  region: Region;
  countries: Country[];
}
