import { Injectable } from '@angular/core';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { Heroes } from './mock-heroes';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl:string = 'http://localhost:8000/api/heroes/';  // URL to web api

  constructor(private http: HttpClient , private messageService: MessageService) { }

  getHeroes (): Observable<Hero[]>
  {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes=>this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }
  getHero(id: number): Observable<Hero>
  {
    const url:string = this.heroesUrl + id + "/";
    return this.http.get<Hero[]>(url)
      .pipe(
        tap(heroes=>this.log(`fetched hero: ${heroes.name}`)),
        catchError(this.handleError('getHeroes', []))
      );
  }
  updateHero(hero:Hero): Observable<Hero>
  {
      const url:string = this.heroesUrl + hero.id + "/";
      return this.http.put(url , hero , httpOptions).pipe(
        tap(heroes => this.log(`updated hero: ${heroes.name}`)),
        catchError(this.handleError('updateHero' , []))
      );
  }
  createHero(name:string) : Observable<Hero>
  {
      return this.http.post<Hero>(this.heroesUrl , {name:name} , httpOptions).pipe(
        tap(heroes => this.log(`Created hero: ${name}`)),
        catchError(this.handleError('createHero' , []))
      );
  }
  deleteHero(id:number) : Observable<Hero>
  {
    const url = this.heroesUrl + id + "/";
    return this.http.delete(url , httpOptions).pipe(
      tap(heroes => this.log(`Deleted Hero`)),
      catchError(this.handleError('deleteHero' , []))
    );
  }
  searchHero(name:string): Observable<Hero[]>
  {
    if (!name.trim()) 
    {
    // if not search term, return empty hero array.
      return of([]);
    }
    const url = this.heroesUrl + "?name=" + name;
    var something = this.http.get<Hero[]>(url).pipe(
      //tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('searchHero' , []))
    );
    console.log(something);
    return something;
  }
  private log(message:string):void
  {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
  };


}
}
