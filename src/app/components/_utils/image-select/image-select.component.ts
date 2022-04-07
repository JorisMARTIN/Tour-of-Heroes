import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'image-select',
	templateUrl: './image-select.component.html',
	styleUrls: ['./image-select.component.scss']
})
export class ImageSelectComponent implements OnInit {

	@Input() elem: any;
	@Input() choices: string[];

	constructor(
		private modalService: NgbModal,
	) {
	}

	ngOnInit(): void {
	}

	open(content: TemplateRef<any>) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((image) => {
			if (image) {
				this.elem.image = image;
			}
		}, (reason => null));
	}

}
