import {
	Component, OnDestroy,
	OnInit,
	QueryList,
	TemplateRef,
	ViewChildren
} from '@angular/core';
import {WeaponService} from "../../services/entity/weapon.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IWeapon} from "../../interfaces/weapon.interface";
import {compare, NgbdSortableHeader, SortEvent} from "../../directives/sortable/sortable.directive";

@Component({
	selector: 'app-weapons',
	templateUrl: './weapons.component.html',
	styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit, OnDestroy {

	sub: Subscription;
	weapons: IWeapon[];
	WEAPONS: IWeapon[];

	newWeaponName: string = "";

	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

	onFilterChange(event: Event) {
		const target = (event.target as HTMLInputElement);

		if (!target.value || target.value.length === 0) this.weapons = this.WEAPONS;
		this.weapons = this.weapons.filter((hero) => hero.name.toLowerCase().includes(target.value.toLowerCase()));
	}

	onSort({column, direction}: SortEvent) {

		// resetting other headers
		this.headers.forEach(header => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		// sorting
		if (!(direction === '' && column === '')) {
			this.weapons = this.weapons.sort((a, b) => {
				const res = compare(a[column], b[column]);
				return direction === 'asc' ? res : -res;
			});
		}
	}

	constructor(
		private weaponService: WeaponService,
		private modalService: NgbModal,
		private router: Router
	) {
	}

	open(content: TemplateRef<any>) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			if (result === 'save') {
				// Création du héro
				const newWeapon: IWeapon = {
					name: this.newWeaponName,
					dodge: 0,
					pv: 0,
					power: 0,
					attack: 0,
					id: ""
				};
				this.newWeaponName = "";
				this.weaponService.create(newWeapon).then((newId) => {
					if (newId) {
						this.router.navigate(['weapon/', newId]);
					}
				})
			}
		}, (reason => null));
	}

	ngOnInit(): void {
		this.getWeapons();
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	getWeapons(): void {
		this.sub = this.weaponService.getAll().subscribe(weapons => {
			this.weapons = weapons.sort((a, b) => compare(a.name, b.name));
			this.WEAPONS = weapons;
		});
	}

	deleteWeapon(weapon: IWeapon) {
		this.weaponService.delete(weapon);
	}

}
