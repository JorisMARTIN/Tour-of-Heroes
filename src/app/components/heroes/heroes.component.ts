import {Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import {IHero} from "../../interfaces/hero.interface";
import {HeroService} from "../../services/entity/hero.service";
import {Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {compare, NgbdSortableHeader, SortEvent} from "../../directives/sortable/sortable.directive";

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {

	sub: Subscription;
	heroes: IHero[];
	HEROES: IHero[];

	newHeroName: string = "";

	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

	onFilterChange(event: Event) {
		const target = (event.target as HTMLInputElement);

		if (!target.value || target.value.length === 0) this.heroes = this.HEROES;
		this.heroes = this.heroes.filter((hero) => hero.name.toLowerCase().includes(target.value.toLowerCase()));
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
			this.heroes = this.heroes.sort((a, b) => {
				const res = compare(a[column], b[column]);
				return direction === 'asc' ? res : -res;
			});
		}
	}

	constructor(
		private heroService: HeroService,
		private modalService: NgbModal,
		private router: Router
	) {}

	open(content: TemplateRef<any>) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			if (result === 'save') {
				// Création du héro
				const newHero: IHero = {
					name: this.newHeroName,
					dodge: 10,
					pv: 10,
					power: 10,
					attack: 10,
					id: ""
				};
				this.newHeroName = "";
				this.heroService.create(newHero).then((newId) => {
					if (newId) {
						this.router.navigate(['hero/', newId]);
					}
				})
			}
		}, (reason => null));
	}

	ngOnInit(): void {
		this.getHeroes();
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	getHeroes(): void {
		this.sub = this.heroService.getAll().subscribe(heroes => {
			this.heroes = heroes.sort((a, b) => compare(a.name, b.name));
			this.HEROES = heroes;
		});
	}

	deleteHero(hero: IHero) {
		this.heroService.delete(hero);
	}
}
