export interface Hero {
	id: string,
	name: string,
	attack: number,
	dodge: number,
	power: number,
	pv: number,
	[field: string]: any
}
