import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Inject, Injectable} from "@angular/core";
import {ToastService} from "./toast.service";
import {IFirestoreService} from "../interfaces/firestore.interface";

@Injectable({
	providedIn: 'root'
})
export class FirestoreService<T> implements IFirestoreService<T> {

	// La collection firestore
	private entityRef: AngularFirestoreCollection<any>;
	// L'ensemble des entités
	entities$: Observable<any[]>;

	// Initialisation de la collection et récupération de l'ensemble des héros
	constructor(@Inject('DEFAULT_COLLECTION_NAME') collectionName: string, protected afs: AngularFirestore, protected toastService: ToastService) {
		if (!collectionName) {
			throw new Error('Firestore called with no collection name');
		}

		this.entityRef = afs.collection(collectionName);
		this.entities$ = afs.collection(collectionName).valueChanges({ idField: 'id' });
	}

	/**
	 * Récupère une entité
	 * @param id L'id du héro à récupérer
	 */
	get(id: string): Observable<T> {
		return this.entityRef.doc(id).valueChanges({idField: 'id'});
	}

	/**
	 * Récupère l'ensemble des entités
	 */
	getAll(): Observable<T[]> {
		return this.entities$;
	}

	/**
	 * Créer une nouvelle entité
	 * @param entity L'entité à créer'
	 * @return string|null L'id de la nouvelle entité
	 */
	async create(entity: T): Promise<string | null> {
		const id = this.afs.createId();
		try {
			await this.entityRef.doc(id).set(entity);
			this.toastService.showSuccess({
				text: "Succès",
				detail: "Votre entité a été créé avec succès !"
			});
			return id;
		} catch (err) {
			this.toastService.showDanger({
				text: "Erreur",
				detail: "Une erreur est survenue lors de la création de votre entité !\nErreur : " + err
			});
			return null;
		}
	}

	/**
	 * Modifie une entité existante
	 * @param entity L'entité modifié à mettre à jour
	 */
	async update(entity: T): Promise<void>{
		try {
			// @ts-ignore
			await this.entityRef.doc(entity.id).update(entity);
			this.toastService.showSuccess({
				text: "Succès",
				detail: "Votre entité a été sauvegardée avec succès !"
			});
		} catch (err) {
			this.toastService.showDanger({
				text: "Erreur",
				detail: "Une erreur est survenue lors de la sauvegarde de votre entité !\nErreur : " + err
			});
		}
	}

	/**
	 * Supprime un héro de la base de donnée
	 * @param entity L'entité à supprimer
	 */
	async delete(entity: T): Promise<void> {
		try {
			// @ts-ignore
			await this.entityRef.doc(entity.id).delete();
			this.toastService.showSuccess({
				text: "Succès",
				detail: "Votre entité a été supprimé avec succès !"
			});
		} catch (err) {
			this.toastService.showDanger({
				text: "Erreur",
				detail: "Une erreur est survenue lors de la suppression de votre entité !\nErreur : " + err
			});
		}
	}
}
