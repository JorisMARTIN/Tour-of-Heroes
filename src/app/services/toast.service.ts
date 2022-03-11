import { Injectable } from '@angular/core';
import {IToast} from "../interfaces/toast.interface";

const STANDART_DELAY = 5000;

@Injectable({ providedIn: 'root' })
export class ToastService {
	private toasts: IToast[] = [];

	show(toast: IToast) {
		toast.delay = toast.delay || STANDART_DELAY;
		this.toasts.push(toast);
	}

	remove(toast: IToast) {
		this.toasts = this.toasts.filter(t => t !== toast);
	}

	showStandard(toast: IToast) {
		this.show(toast);
	}

	showSuccess(toast: IToast) {
		toast.classname = "bg-success";
		this.show(toast);
	}

	showDanger(toast: IToast) {
		toast.classname = "bg-danger";
		this.show(toast);
	}

	getToasts(): IToast[] {
		return this.toasts;
	}
}
