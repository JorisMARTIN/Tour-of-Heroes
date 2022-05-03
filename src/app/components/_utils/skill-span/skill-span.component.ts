import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-skill-span',
  templateUrl: './skill-span.component.html',
  styleUrls: ['./skill-span.component.scss']
})
export class SkillSpanComponent implements OnInit {

	@Input() value: number

	constructor() { }

	ngOnInit(): void {
	}

	getSignedNumber(): string {
		return this.value > 0 ? '+' + this.value : this.value.toString()
	}

}
