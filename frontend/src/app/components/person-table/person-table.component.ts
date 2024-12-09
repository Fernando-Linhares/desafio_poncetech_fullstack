import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Person} from "./Person";
import {NgClass} from "@angular/common";
import {PersonService} from "../../services/person.service";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {PersonFormComponent} from "../person-form/person-form.component";

@Component({
  selector: 'app-person-table',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    NgClass,
    FormsModule,
    PersonFormComponent
  ],
  templateUrl: './person-table.component.html'
})
export class PersonTableComponent {
  openModal: boolean = false;
  person: Person = {
    id: 0,
    name: '',
    email: '',
    birth_date: '',
    active: false,
  };

  displayedColumns: string[] = ['id', 'name', 'email', 'birth_date', 'active', 'actions'];
  dataSource = new MatTableDataSource<Person>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(PersonFormComponent) personForm!: PersonFormComponent;

  public nameModal!: string;

  ngOnInit() {
    this.fetchData();
  }

  constructor(private personService: PersonService) {
  }

  fetchData() {
    this.personService.list()
      .subscribe(response => {
        this.dataSource.data = response.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(id: number) {
    this.personService.delete(id).subscribe(response => {
      this.personService.list()
      .subscribe(response => {
        this.dataSource.data = response.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  create() {
    this.nameModal  = 'Criar ';
    this.openModal = true;
  }

  edit(id: number) {
    this.nameModal  = 'Editar ';

    this.personService.find(id).subscribe(response => {
      this.person = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        birth_date: response.data.birth_date,
        active: response.data.active,
      };
      this.personForm.applyInForm(this.person);
      this.openModal = true;
    });
  }

  resetForm() {
    this.person = {
      id: 0,
      name: '',
      email: '',
      birth_date: '',
      active: false,
    };
    this.personForm.resetForm();
  }

  closeModal() {
    this.openModal = false;
    this.resetForm();
  }

  onSubmitForm(data: string) {
    this.fetchData();
    this.closeModal();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
