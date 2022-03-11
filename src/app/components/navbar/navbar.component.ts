import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	@Input() title!: String;

	active = 1;
	isNavbarCollapsed = true;

	currentRoute: string | undefined;

	constructor(private router: Router) {
		router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.currentRoute = event.url;
			}
		});
	}

	ngOnInit(): void {
	}
}
