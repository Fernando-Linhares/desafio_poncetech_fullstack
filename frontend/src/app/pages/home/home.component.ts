import { Component } from '@angular/core';
import {DashboardComponent} from "../../components/dashboard/dashboard.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {PersonTableComponent} from "../../components/person-table/person-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DashboardComponent,
    MatTableModule,
    MatSortModule,
    PersonTableComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
