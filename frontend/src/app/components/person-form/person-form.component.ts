import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Person} from "../person-table/Person";
import {PersonService} from "../../services/person.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './person-form.component.html'
})
export class PersonFormComponent {
  @Input() person!: Person;
  @Output() closeModal = new EventEmitter<string>();

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService
  ) {
    this.form = this.formBuilder.group({
      name: [this.person?.name ?? '', [Validators.required, Validators.minLength(6)]],
      email: [this.person?.email ?? '', [Validators.required, Validators.email]],
      birth_date: [ this.person?.birth_date ?? '', []],
      active: [ false, []],
    });
  }

  submit() {
    if (this.form.valid) {
      let { id } = this.person;

      if(id === 0) {
        this.personService.create(this.form.value).subscribe(()=> {
          this.closeModal.emit();
        });
        return;
      }

      this.personService.update(id, this.form.value).subscribe(()=> {
        this.closeModal.emit();
      });
    }
  }

  resetForm()
  {
    this.form.reset()
  }

  applyInForm(person: Person) {
    let d = new Date(person.birth_date);
    this.form.patchValue({
      name: person.name,
      email: person.email,
      active: person.active,
      birth_date: d.toISOString()
    })
  }
}
