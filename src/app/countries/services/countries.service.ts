import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiIrl : string = 'https://restcountries.com/v3.1';

  constructor(private http : HttpClient) {

  }

  searchCountryByAlphCode(code : string) : Observable<Country | null>{
    const url = `${this.apiIrl}/alpha/${code}`
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        //Se retorna un observable de array vacio
        catchError(error => {
          return of(null)
        })
      )
  }
  searchCapital(term : string) : Observable<Country[]>{
    const url = `${this.apiIrl}/capital/${term}`
    return this.http.get<Country[]>(url)
      .pipe(
        //Se retorna un observable de array vacio
        catchError(error => {
          return of([])
        })
      )
  }

  searchRegion(term : string) : Observable<Country[]>{
    const url = `${this.apiIrl}/region/${term}`
    return this.http.get<Country[]>(url)
      .pipe(
        //Se retorna un observable de array vacio
        catchError(error => {
          return of([])
        })
      )
  }

  searchCountry(term : string) : Observable<Country[]>{
    const url = `${this.apiIrl}/name/${term}`
    return this.http.get<Country[]>(url)
      .pipe(
        //Se retorna un observable de array vacio
        catchError(error => {
          return of([])
        })
      )
  }

}
