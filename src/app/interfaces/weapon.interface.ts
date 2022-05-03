import {ISkills} from "./skills.interface";

export interface IWeapon extends ISkills{
	id: string,
	name: string,
	image?: string
}
