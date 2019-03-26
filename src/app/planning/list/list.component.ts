import { Component, OnInit } from '@angular/core';
import {Planning} from "../planning.model";
import {PlanningService} from "../planning.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {

  public plannings: Planning[];

  constructor(private planningService: PlanningService) {
    this.plannings = planningService.getPlannings();
  }

  ngOnInit() {
  }

}
