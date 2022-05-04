import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHero} from '../../interfaces/hero.interface';
import {HeroService} from '../../services/entity/hero.service';
import {WeaponService} from "../../services/entity/weapon.service";
import {IWeapon} from "../../interfaces/weapon.interface";
import {Subscription} from "rxjs";


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

	TOP_NUMBER: number = 5;
	heroes: IHero[];
	weapons: IWeapon[];

	mostUsedWeapons: {[weaponId: string]: number};

	heroSub: Subscription;
	weaponSub: Subscription;

	constructor(
		private heroService: HeroService,
		private weaponService: WeaponService,
	) {}

	ngOnInit(): void {
		this.heroSub = this.getHeroes();
		this.weaponSub = this.getWeapons();
	}

	ngOnDestroy() {
		this.heroSub.unsubscribe();
		this.weaponSub.unsubscribe();
	}

	getHeroes(): Subscription {
		return this.heroService.getAll()
			.subscribe(heroes => this.heroes = heroes.slice(0, this.TOP_NUMBER));
	}

	getWeapons(): Subscription {
		return this.weaponService.getAll()
			.subscribe(weapon => {
				this.weaponService.getMostUsedWeapon().then((res) => {
					this.mostUsedWeapons = res;
					this.weapons = weapon.sort((a, b) => res[b.id] - res[a.id]).slice(0, this.TOP_NUMBER)
				})
			});
	}

	getWeaponValue(weaponId: string, key: string): number {
		const weapon = this.weapons.find((weapon) => weapon.id === weaponId) as IWeapon;
		return weapon[key];
	}
}
