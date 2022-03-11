import {Component, OnInit, TemplateRef} from '@angular/core';
import {Hero} from "../../interfaces/hero";
import {HeroService} from "../../services/hero.service";
import {Observable, of} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

	heroes$: Observable<Hero[]> = of([]);

	newHeroName: string = "";

	constructor(
		private heroService: HeroService,
		private modalService: NgbModal,
		private router: Router
	) {
	}

	open(content: TemplateRef<any>) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			if (result === 'save') {
				// Création du héro
				const newHero: Hero = {
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

	getHeroes(): void {
		this.heroes$ = this.heroService.getAll();
	}

	setActive(heroId: string, isActive: boolean): void {
		const elem = document.getElementById('hero-component-' + heroId);
		if (!elem) return;

		if (isActive) {
			elem.classList.add('active');
		} else {
			elem.classList.remove('active');
		}
	}

	deleteHero(hero: Hero) {
		this.heroService.delete(hero);
	}
}
