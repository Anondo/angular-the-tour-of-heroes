import { Injectable } from '@angular/core';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { Heroes } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>
  {
    this.messageService.add("HeroService: fetched heroes");
    return of(Heroes);
  }


}
