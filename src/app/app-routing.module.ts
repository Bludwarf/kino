import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlanningComponent} from "./planning/planning.component";
import {ListComponent} from "./planning/list/list.component";

const routes: Routes = [
  { path: '', redirectTo: 'plannings', pathMatch: 'full'},
  { path: 'plannings',          component: ListComponent },
  { path: 'planning/:date',     component: PlanningComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
