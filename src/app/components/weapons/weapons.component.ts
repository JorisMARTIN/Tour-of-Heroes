import { Component, OnInit } from '@angular/core';
import {WeaponService} from "../../services/entity/weapon.service";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {

  constructor(private weaponService: WeaponService) { }

  ngOnInit(): void {
  }

}
