import {Component, Input, OnInit} from '@angular/core';
import {ISkills} from "../../../interfaces/skills.interface";
import {IWeapon} from "../../../interfaces/weapon.interface";

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

	@Input() mustBeEqualTo: number;
	@Input() minValue: number;
	@Input() maxValue: number;
	@Input() skills: ISkills;
	
	@Input() weapon?: IWeapon;

	constructor() {
	}

	ngOnInit(): void {
	}

	/**
	 * Called to control the value of each abilities according to the available points
	 *
	 * @param e Input change event
	 */
	onStatChange(e: Event) {
		const target = e.target as HTMLInputElement;

		const skillsCopy = JSON.parse(JSON.stringify(this.skills));
		skillsCopy[target.name] = Number.parseInt(target.value);
		const availablePoints = this.computeAvailablePoint(skillsCopy);

		if (availablePoints < 0) {
			skillsCopy[target.name] += availablePoints;
			target.value = skillsCopy[target.name]
		}

		this.skills[target.name] = skillsCopy[target.name];
	}

	balancePoints(): void {
		const value = this.mustBeEqualTo / 4;
		this.skills.pv = this.skills.attack = this.skills.power = this.skills.dodge = value;
	}


	/**
	 * Compute the rest of available points
	 */
	computeAvailablePoint(skills: ISkills): number {
		return this.mustBeEqualTo - (skills.attack + skills.power + skills.pv + skills.dodge);
	}


}
