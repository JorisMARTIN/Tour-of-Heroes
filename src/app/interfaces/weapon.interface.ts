export interface IWeapon {
	id: string,
	name: string,
	pv: number,
	attack: number,
	dodge: number,
	power: number,
	[field: string]: any
}
