import {Injectable} from '@angular/core';
import {FirestoreService} from "./firestore.service";
import {IWeapon} from "../interfaces/weapon.interface";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastService} from "./toast.service";

const COLLECTION_NAME = 'Weapons';

@Injectable({
	providedIn: 'root'
})
export class WeaponService extends FirestoreService<IWeapon> {
	constructor(protected override afs: AngularFirestore, protected override toastService: ToastService) {
		super(COLLECTION_NAME, afs, toastService);
	}
}
