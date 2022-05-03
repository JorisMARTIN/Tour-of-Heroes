import {Injectable} from '@angular/core';
import {FirestoreService} from "../firestore.service";
import {IWeapon} from "../../interfaces/weapon.interface";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastService} from "../toast.service";
import {IHero} from "../../interfaces/hero.interface";

const COLLECTION_NAME = 'Weapons';

@Injectable({
	providedIn: 'root'
})
export class WeaponService extends FirestoreService<IWeapon> {
	constructor(protected override afs: AngularFirestore, protected override toastService: ToastService) {
		super(COLLECTION_NAME, afs, toastService);
	}

	async getMostUsedWeapon(): Promise<{ [weaponId: string]: number }> {

		// Collect heroes which holding a weapon
		const heroHoldingWeapon: IHero[] = await new Promise((resolve, reject) => {
			let res: IHero[];
			const sub = this.afs.collection<IHero>('Heroes', ref => ref.where('weaponId', '!=', null)).valueChanges({idField: 'id'}).subscribe({
				next: (value) => {
					sub.unsubscribe();
					resolve(value)
				},
				error: (err) => reject(err),
				complete: () => resolve(res)
			});

			setTimeout(() => {
				sub.unsubscribe();
				reject('Timeout')
			}, 500)
		});

		return await new Promise((resolve) => {
			const sub = this.entities$.subscribe(weapons => {
				sub.unsubscribe();

				const topWeapons: { [weaponId: string]: number} = {};

				for (const weapon of weapons) {
					topWeapons[weapon.id] = 0;
				}

				for (const hero of heroHoldingWeapon) {
					if (hero.weaponId) topWeapons[hero.weaponId] += 1;
				}

				resolve(topWeapons);
			});
		});
	}
}
