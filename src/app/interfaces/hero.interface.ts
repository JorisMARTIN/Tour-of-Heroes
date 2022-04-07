import {ISkills} from "./skills.interface";

export interface IHero extends ISkills{
	id: string,
	name: string,
	image?: string,
	weaponId?: string,
	[field: string]: any
}
