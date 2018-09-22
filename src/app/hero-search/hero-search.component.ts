import { Component, OnInit } from '@angular/core';

import {Hero} from "../hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  public heroes:Hero[];

  constructor(private heroService: HeroService) { }

  search(name:string):void
  {
    this.heroService.searchHero(name).subscribe(heroes => this.heroes = heroes);
    console.log(this.heroes);
  }

  ngOnInit() {
  }

}
