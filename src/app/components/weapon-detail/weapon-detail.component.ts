import {Component, OnDestroy, OnInit} from '@angular/core';
import {IWeapon} from "../../interfaces/weapon.interface";
import {ISkills} from "../../interfaces/skills.interface";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {WeaponService} from "../../services/entity/weapon.service";

@Component({
	selector: 'app-weapon-detail',
	templateUrl: './weapon-detail.component.html',
	styleUrls: ['./weapon-detail.component.scss']
})
export class WeaponDetailComponent implements OnInit, OnDestroy {

	weapon: IWeapon;
	skills: ISkills;

	sub: Subscription;

	constructor(
		private route: ActivatedRoute,
		private weaponService: WeaponService,
		private location: Location
	) {
	}

	ngOnInit(): void {
		this.getWeapon();
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	getWeapon(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.sub = this.weaponService.get(id).subscribe(weapon => {
				this.weapon = weapon;
				this.skills = {
					pv: weapon.pv,
					power: weapon.power,
					dodge: weapon.dodge,
					attack: weapon.attack
				}
			})
		}
	}

	goBack(): void {
		this.location.back();
	}

	save() {
		this.weapon = {
			...this.weapon,
			...this.skills
		}
		this.weaponService.update(this.weapon);
	}

}
