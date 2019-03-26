import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlanningService} from "./planning.service";
import {Planning} from "./planning.model";
import {SeanceInstance} from "../seance/seance-instance.model";

/** Pour comparer les jours dans la semaine et détecter une nouvelle semaine */
const convertJourNum = (jourNum: number): number => (jourNum + 6) % 7;

const debutSemaine = (seance: SeanceInstance, seancePrecedente: SeanceInstance): boolean => {
  if (!seancePrecedente) {
    return true;
  }
  if (seance.date.getTime() <= seancePrecedente.date.getTime()) {
    return false;
  }
  const num = convertJourNum(seance.date.getDay());
  const numPrecedent = convertJourNum(seancePrecedente.date.getDay());
  return num < numPrecedent;
};

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.styl']
})
export class PlanningComponent implements OnInit {

  planning: Planning;
  private currentSeanceInForLoop: SeanceInstance;
  private currentSeanceInForLoopIsEven = true;
  private currentSeanceInForLoopIsSameDay = false;

  constructor(private route: ActivatedRoute, private plannings: PlanningService, private ref: ChangeDetectorRef) {
    route.paramMap.subscribe(map => {
      const date = new Date(map.get('date'));
      this.planning = plannings.getPlanning(date);
      // TODO : 404 with guards
      if (!this.planning) {
        throw new Error(`Planning du ${date} introuvable`);
      }
    });
  }

  ngOnInit() {
  }

  getRowClassList(seance: SeanceInstance): string {
    if (this.currentSeanceInForLoop) {
      this.currentSeanceInForLoopIsSameDay = this.currentSeanceInForLoop.jourSemaine === seance.jourSemaine;
      if (!this.currentSeanceInForLoopIsSameDay) {
        this.currentSeanceInForLoopIsEven = !this.currentSeanceInForLoopIsEven;
      }
    }

    const classList = [];
    if (this.currentSeanceInForLoopIsEven) {
      classList.push('even');
    }
    if (this.currentSeanceInForLoopIsSameDay) {
      classList.push('same-day');
    }
    if (debutSemaine(seance, this.currentSeanceInForLoop)) {
      // FIXME rror: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'classList: even debut-semaine'. Current value: 'classList: even'.
      classList.push('debut-semaine');
    }
    if (!seance.benevoles.caisse || !seance.benevoles.accueil) {
      classList.push('non-assuree');
    }
    this.currentSeanceInForLoop = seance;
    return classList.join(' ');
  }



}
