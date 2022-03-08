import { Injectable } from '@angular/core';
import {Toast} from "../interfaces/toast";

const STANDART_DELAY = 5000;

@Injectable({ providedIn: 'root' })
export class ToastService {
	private toasts: Toast[] = [];

	show(toast: Toast) {
		toast.delay = toast.delay || STANDART_DELAY;
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter(t => t !== toast);
	}

	showStandard(toast: Toast) {
		this.show(toast);
	}

	showSuccess(toast: Toast) {
		toast.classname = "bg-success";
		this.show(toast);
	}

	showDanger(toast: Toast) {
		toast.classname = "bg-danger";
		this.show(toast);
	}

	getToasts(): Toast[] {
		return this.toasts;
	}
}
