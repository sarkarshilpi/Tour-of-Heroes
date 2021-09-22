import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Heroes } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;
  heroes: Hero[] = [];
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor(private heroserv:HeroService,private msgService:MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.msgService.add(`HeroesComponent: Selected hero id=${hero.id}`);

  }

  getHeroes():void{
    this.heroserv.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroserv.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroserv.deleteHero(hero.id).subscribe();
  }
}
