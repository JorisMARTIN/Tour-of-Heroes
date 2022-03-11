import { Component, OnInit } from '@angular/core';
import {WeaponService} from "../../services/weapon.service";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {

  constructor(weaponService: WeaponService) { }

  ngOnInit(): void {
  }

}
