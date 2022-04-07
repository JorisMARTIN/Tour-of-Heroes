import {Component, OnInit} from '@angular/core';
import {IHero} from '../../interfaces/hero.interface';
import {HeroService} from '../../services/entity/hero.service';
import {WeaponService} from "../../services/entity/weapon.service";
import {IWeapon} from "../../interfaces/weapon.interface";


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	TOP_NUMBER: number = 5;
	heroes: IHero[] = [];
	weapons: IWeapon[] = [];

	constructor(
		private heroService: HeroService,
		private weaponService: WeaponService,
	) {}

	ngOnInit(): void {
		this.getHeroes();
		this.getWeapons();
	}

	getHeroes(): void {
		this.heroService.getAll()
			.subscribe(heroes => this.heroes = heroes.slice(0, this.TOP_NUMBER - 1));
	}

	getWeapons(): void {
		this.weaponService.getAll()
			.subscribe(weapon => this.weapons = weapon.slice(0, this.TOP_NUMBER - 1));
	}
}
