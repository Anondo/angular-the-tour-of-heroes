import { Component, OnInit } from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public selectedHero:Hero;
  public heroes:Hero[];

  constructor(private heroService: HeroService) { }

  selectHero(selectedHero:Hero):void
  {
    this.selectedHero = selectedHero;
  }

  getHeroes(): void
  {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  add(name:string):void
  {
    this.heroService.createHero(name).subscribe(hero => this.heroes.push(hero));
  }
  delete(id:number):void
  {
    this.heroes = this.heroes.filter(h => h.id != id);
    this.heroService.deleteHero(id).subscribe();
  }


  ngOnInit() {
    this.getHeroes();
  }

}
