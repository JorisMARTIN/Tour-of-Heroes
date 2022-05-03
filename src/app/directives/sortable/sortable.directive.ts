import {IWeapon} from "../../interfaces/weapon.interface";
import {Directive, EventEmitter, Input, Output} from "@angular/core";
import {IHero} from "../../interfaces/hero.interface";

export type SortColumn = keyof IWeapon | keyof IHero | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': 'asc', '': 'asc'};

export const compare = (v1: string | number, v2: string | number) => {
	if (typeof v1 === 'string' && typeof v2 === 'string') {
		v1 = v1.toLowerCase();
		v2 = v2.toLowerCase();
	}
	return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()'
	}
})
export class NgbdSortableHeader {

	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();


	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({column: this.sortable, direction: this.direction});
	}


}
