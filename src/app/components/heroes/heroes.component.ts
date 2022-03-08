import { Component, OnInit } from '@angular/core';
import { Hero } from "../../interfaces/hero";
import {HeroService} from "../../services/hero.service";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Observable<Hero[]> = of([]);

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = this.heroService.getAll();
  }

  setActive(heroId: string, isActive: boolean): void {
	  const elem = document.getElementById('hero-component-'+heroId);
	  const badge = elem?.firstElementChild;
	  if (!elem || !badge) return;

	  if (isActive) {
		  elem.classList.add('active');
		  badge.className = 'badge bg-secondary';
	  } else {
		  elem.classList.remove('active');
		  badge.className = 'badge bg-primary';
	  }
  }

}
