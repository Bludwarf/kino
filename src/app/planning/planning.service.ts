import { Injectable } from '@angular/core';
import {Planning} from "./planning.model";
import {PLANNINGS} from "./planning.service.mock";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor() { }

  getPlannings(): Planning[] {
    return PLANNINGS;
  }

  getPlanning(date: Date): Planning {
    return this.getPlannings().find(planning => planning.memeJour(date));
  }
}
