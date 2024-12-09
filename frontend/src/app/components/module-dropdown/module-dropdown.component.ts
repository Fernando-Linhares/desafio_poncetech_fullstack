import {Component, Input} from '@angular/core';
import { MatIconModule} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {Submodule} from "./Submodule";

@Component({
  selector: 'app-module-dropdown',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    MatIconModule
  ],
  templateUrl: './module-dropdown.component.html'
})
export class ModuleDropdownComponent {
  expand: boolean = false;
  active: boolean = false;
  @Input() name: string = '';
  @Input() links: Array<Submodule> = [];
  @Input() icon: string = '';

  select() {
    this.expand = !this.expand;
    this.active = !this.active;
  }

  public ngOnInit() {
    this.expand = this.containsSelectedLink();
    this.active = this.containsSelectedLink();
  }

  private containsSelectedLink()
  {
    return this.links.filter(link => link.active).length > 0;
  }
}
