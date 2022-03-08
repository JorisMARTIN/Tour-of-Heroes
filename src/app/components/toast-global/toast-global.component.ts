import { Component, TemplateRef} from '@angular/core';

import {ToastService} from '../../services/toast.service';

@Component({selector: 'ngbd-toast-global', templateUrl: './toast-global.component.html'})
export class NgbdToastGlobal {
	constructor(public toastService: ToastService) {
	}
}
