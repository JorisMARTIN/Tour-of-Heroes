import {Observable} from "rxjs";

export interface IFirestoreService<T> {
	get(id: string): Observable<T>,
	getAll(): Observable<T[]>,
	create(entity: T): Promise<string|null>,
	update(entity: T): Promise<void>,
	delete(entity: T): Promise<void>
}
