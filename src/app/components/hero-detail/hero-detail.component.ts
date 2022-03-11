import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Hero} from '../../interfaces/hero';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../services/hero.service";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

	GLOBAL_POINT: number = 40;
	hero?: Hero;

	private sub: Subscription | undefined;

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
				.subscribe(hero => this.hero = hero);
		}
	}

	goBack(): void {
		this.location.back();
	}

	save() {
		if (this.hero) this.heroService.update(this.hero);
	}


	/**
	 * Called to control the value of each abilities according to the available points
	 *
	 * @param e Input change event
	 */
	onStatChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (this.hero) {
			const availablePoint = this.computeAvailablePoint(this.hero);
			if (this.hero[target.name] < target.value && availablePoint == 0) {
				target.value = this.hero[target.name];
			} else {
				const value = Number.parseInt(target.value);
				if (availablePoint - (value - this.hero[target.name]) < 0) this.hero[target.name] += availablePoint;
				else this.hero[target.name] = value;
			}
		}
	}

	balancePoints(): void {
		if (this.hero) {
			const value = this.GLOBAL_POINT / 4;
			this.hero.pv = this.hero.attack = this.hero.power = this.hero.dodge = value;
		}
	}

	/**
	 *
	 * @param hero Hero to compute available point
	 */
	computeAvailablePoint(hero: Hero): number {
		return this.GLOBAL_POINT - (hero.attack + hero.power + hero.pv + hero.dodge);
	}

}
