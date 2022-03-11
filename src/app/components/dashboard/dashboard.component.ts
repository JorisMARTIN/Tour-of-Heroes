import { Component, OnInit } from '@angular/core';
import { IHero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  TOP_HEROES_NUMBER: number = 5;
  heroes: IHero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAll()
      .subscribe(heroes => this.heroes = heroes.slice(0, this.TOP_HEROES_NUMBER - 1));
  }
}
