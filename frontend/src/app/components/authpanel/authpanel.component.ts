import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-authpanel',
  standalone: true,
  imports: [
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './authpanel.component.html'
})
export class AuthPanelComponent {

}
