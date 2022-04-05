import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {IHero} from '../../interfaces/hero.interface';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../services/entity/hero.service";
import {Subscription} from "rxjs";
import {ISkills} from "../../interfaces/skills.interface";
import {WeaponService} from "../../services/entity/weapon.service";
import {IWeapon} from "../../interfaces/weapon.interface";

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

	hero: IHero;
	skills: ISkills;

	weapons: IWeapon[];

	private sub: Subscription;
	private wSubscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private weaponService: WeaponService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getHero();
		this.getWeapons();
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
		if (this.wSubscription) this.wSubscription.unsubscribe();
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

	getWeapons(): void {
		this.wSubscription = this.weaponService.getAll().subscribe(weapons => this.weapons = weapons);
	}

	getHeroWeapon(): IWeapon | undefined {
		return this.weapons.find(weapon => weapon.id === this.hero.weaponId);
	}

	onWeaponChange(event: Event): void {
		this.hero.weaponId = (event.target as HTMLSelectElement).value;
	}

	removeWeapon(): void {
		this.hero.weaponId = '';
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
