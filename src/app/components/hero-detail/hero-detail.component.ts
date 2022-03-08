import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Hero} from '../../interfaces/hero';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../services/hero.service";
import {ToastService} from "../../services/toast.service";

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getHero();
	}

	@Input() hero?: Hero;

	getHero(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.heroService.get(id)
				.subscribe(hero => this.hero = hero);
		}
	}

	goBack(): void {
		this.location.back();
	}

	save() {
		if (this.hero) this.heroService.update(this.hero);
	}
}
