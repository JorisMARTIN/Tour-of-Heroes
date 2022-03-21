import {Injectable} from "@angular/core";
import {FirestoreService} from "../firestore.service";
import {IHero} from "../../interfaces/hero.interface";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastService} from "../toast.service";

const COLLECTION_NAME = 'Heroes';

@Injectable({
	providedIn: 'root'
})
export class HeroService extends FirestoreService<IHero> {

	constructor(protected override afs: AngularFirestore, protected override toastService: ToastService) {
		super(COLLECTION_NAME, afs, toastService);
	}
}
