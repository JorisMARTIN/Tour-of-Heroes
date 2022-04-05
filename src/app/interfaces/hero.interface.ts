import {ISkills} from "./skills.interface";

export interface IHero extends ISkills{
	id: string,
	name: string,
	weaponId?: string,
	[field: string]: any
}
