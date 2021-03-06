import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeroesComponent} from './components/heroes/heroes.component';
import {FormsModule} from "@angular/forms";
import {HeroDetailComponent} from './components/hero-detail/hero-detail.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {ToastsContainer} from "./components/toast-global/toast-container.component";
import {WeaponsComponent} from './components/weapons/weapons.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SkillsComponent} from './components/_utils/skills/skills.component';
import {NgbdSortableHeader} from './directives/sortable/sortable.directive';
import { WeaponDetailComponent } from './components/weapon-detail/weapon-detail.component';
import { ImageSelectComponent } from './components/_utils/image-select/image-select.component';
import { SkillSpanComponent } from './components/_utils/skill-span/skill-span.component'
@NgModule({
	declarations: [
		AppComponent,
		HeroesComponent,
		HeroDetailComponent,
		DashboardComponent,
		ToastsContainer,
		WeaponsComponent,
		NavbarComponent,
		SkillsComponent,
		NgbdSortableHeader,
  WeaponDetailComponent,
  ImageSelectComponent,
  SkillSpanComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FormsModule,
		/*provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),*/
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule
	],
	providers: [],
	bootstrap: [AppComponent],
	exports: []
})
export class AppModule {
}
