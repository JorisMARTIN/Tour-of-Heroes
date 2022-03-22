import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from "./components/heroes/heroes.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HeroDetailComponent} from "./components/hero-detail/hero-detail.component";
import {WeaponsComponent} from "./components/weapons/weapons.component";
import {WeaponDetailComponent} from "./components/weapon-detail/weapon-detail.component";

const routes: Routes = [
	{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
	{path: 'heroes', component: HeroesComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'hero/:id', component: HeroDetailComponent},
	{path: 'weapons', component: WeaponsComponent},
	{path: 'weapon/:id', component: WeaponDetailComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
