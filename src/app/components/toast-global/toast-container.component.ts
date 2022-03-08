import {Component, TemplateRef} from '@angular/core';

import {ToastService} from '../../services/toast.service';

@Component({
	selector: 'app-toasts',
	template: `
    <ngb-toast
      *ngFor="let toast of toastService.getToasts()"
      [class]="toast.classname || 'bg-info'"
      [autohide]="true"
      [delay]="toast.delay || 3000"
      (hidden)="toastService.remove(toast)"
	  [animation]="true"
    >
		<div class="me-auto">
			<i *ngIf="toast.classname == 'bg-success'" class="bi bi-check-circle"></i>
			<i *ngIf="toast.classname == 'bg-danger'" class="bi bi-x-circle"></i>
			<i *ngIf="toast.classname == 'bg-info'" class="bi bi-info-circle"></i>
			 {{toast.text}}
		</div>
		{{toast.detail || ""}}
    </ngb-toast>
  `,
	host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastsContainer {
	constructor(public toastService: ToastService) {}

	isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }
}
