import {Observable} from "rxjs";
import {Hero} from "../interfaces/hero";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Injectable} from "@angular/core";
import {ToastService} from "./toast.service";

const COLLECTION_NAME = 'Heroes';

@Injectable({
	providedIn: 'root'
})
export class HeroService {
	private toastService: ToastService;

	private heroesRef: AngularFirestoreCollection<any>;
	heroes$: Observable<any[]>;

	constructor(firestore: AngularFirestore, toastService: ToastService) {
		this.toastService = toastService;
		this.heroesRef = firestore.collection(COLLECTION_NAME);
		this.heroes$ = firestore.collection(COLLECTION_NAME).valueChanges({ idField: 'id' });
	}

	get(id: string): Observable<Hero> {
		return this.heroesRef.doc(id).valueChanges({idField: 'id'});
	}

	getAll(): Observable<Hero[]> {
		return this.heroes$;
	}

	create(hero: Hero){
		this.heroesRef.add({ ...hero });
	}

	async update(hero: Hero): Promise<void>{
		try {
			await this.heroesRef.doc(hero.id).update(hero);
			this.toastService.showSuccess({
				text: "Sauvegarde effectuée !"
			});
		} catch (err) {
			this.toastService.showDanger({
				text: "Sauvegarde effectuée !"
			});
		}
	}

	delete(hero: Hero){
		this.heroesRef.doc(hero.id).delete();
	}
}
