import { Injectable } from '@angular/core';
import {Benevole} from "./benevole.model";
import {BENEVOLES} from "./benevole.service.mock";

@Injectable({
  providedIn: 'root'
})
export class BenevoleService {

  constructor() { }

  getBenevoles(): Benevole[] {
    return BENEVOLES;
  }
}
