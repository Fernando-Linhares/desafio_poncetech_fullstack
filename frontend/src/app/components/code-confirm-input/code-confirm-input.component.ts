import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'code-confirm-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    UpperCasePipe
  ],
  templateUrl: './code-confirm-input.component.html',
})
export class CodeConfirmInputComponent {
  @Output() completeCodeEvent = new EventEmitter<string>();
  @Input() invalidCode = false;
  @Input() ok: boolean = false;

  public context: {chars: Array<string>, index: number, invalid: boolean} = {
    chars: ['', '', '', '', ''],
    index: 0,
    invalid: false
  };

  onPress(event: any, index: number): void {
    this.context.chars[index] = '';
    this.context.chars[index] = event.target.value.toUpperCase();
    let el = document.getElementsByTagName('input');
    let nextIndex = index +1;

    if(nextIndex < this.context.chars.length) {
      this.context.chars[nextIndex] = '';
      el[nextIndex].focus();
    }

    if(index == this.context.chars.length - 1) {
      this.completeCodeEvent.emit(this.context.chars.join(''));
    }
  }
}
