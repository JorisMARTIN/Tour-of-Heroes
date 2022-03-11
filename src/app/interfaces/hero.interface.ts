export interface IHero {
	id: string,
	name: string,
	attack: number,
	dodge: number,
	power: number,
	pv: number,
	[field: string]: any
}
