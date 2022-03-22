import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {IHero} from '../../interfaces/hero.interface';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../services/entity/hero.service";
import {Subscription} from "rxjs";
import {ISkills} from "../../interfaces/skills.interface";

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

	hero: IHero;
	skills: ISkills;

	private sub: Subscription;

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getHero();
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
	}

	getHero(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.sub = this.heroService.get(id)
				.subscribe(hero => {
					this.hero = hero;
					this.skills = {
						pv: hero.pv,
						power: hero.power,
						dodge: hero.dodge,
						attack: hero.attack
					}
				});
		}
	}

	goBack(): void {
		this.location.back();
	}

	save() {
		this.hero = {
			...this.hero,
			...this.skills
		}
		this.heroService.update(this.hero);
	}

}
