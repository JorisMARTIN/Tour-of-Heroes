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

	// La collection firestore des héros
	private heroesRef: AngularFirestoreCollection<any>;
	// L'ensemble des héros
	heroes$: Observable<any[]>;

	// Initialisation de la collection et récupération de l'ensemble des héros
	constructor(private readonly afs: AngularFirestore, toastService: ToastService) {
		this.toastService = toastService;
		this.heroesRef = afs.collection(COLLECTION_NAME);
		this.heroes$ = afs.collection(COLLECTION_NAME).valueChanges({ idField: 'id' });
	}

	/**
	 * Récupère un héro de la base de donnée
	 * @param id L'id du héro à récupérer
	 */
	get(id: string): Observable<Hero> {
		return this.heroesRef.doc(id).valueChanges({idField: 'id'});
	}

	/**
	 * Récupère l'ensemble des héros de la base de donnée
	 */
	getAll(): Observable<Hero[]> {
		return this.heroes$;
	}

	/**
	 * Créer un nouvel héro dans la base de donnée
	 * @param hero Le héro à créer
	 * @return string|null L'id du nouvel héro ou null si une erreur survient
	 */
	async create(hero: Hero): Promise<string | null> {
		const id = this.afs.createId();
		try {
			// await this.heroesRef.add({ ...hero });
			await this.heroesRef.doc(id).set(hero);
			this.toastService.showSuccess({
				text: "Succès",
				detail: "Votre héro a été créé avec succès !"
			});
			return id;
		} catch (err) {
			this.toastService.showDanger({
				text: "Erreur",
				detail: "Une erreur est survenue lors de la création de votre héro !\nErreur : " + err
			});
			return null;
		}
	}

	/**
	 * Modifie un héro existant et le met à jour en base de donnée.
	 * @param hero Le héro modifié à mettre à jour
	 */
	async update(hero: Hero): Promise<void>{
		try {
			await this.heroesRef.doc(hero.id).update(hero);
			this.toastService.showSuccess({
				text: "Succès",
				detail: "Votre héro a été sauvegardé avec succès !"
			});
		} catch (err) {
			this.toastService.showDanger({
				text: "Erreur",
				detail: "Une erreur est survenue lors de la sauvegarde de votre héro !\nErreur : " + err
			});
		}
	}

	/**
	 * Supprime un héro de la base de donnée
	 * @param hero Le héro à supprimer
	 */
	async delete(hero: Hero): Promise<void> {
		try {
			await this.heroesRef.doc(hero.id).delete();
			this.toastService.showSuccess({
				text: "Succès",
				detail: "Votre héro a été supprimé avec succès !"
			});
		} catch (err) {
			this.toastService.showDanger({
				text: "Erreur",
				detail: "Une erreur est survenue lors de la suppression de votre héro !\nErreur : " + err
			});
		}
	}
}
