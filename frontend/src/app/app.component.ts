import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicesProviderModule } from "./services-provider/services-provider.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ServicesProviderModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Challenge Fullstack - Ponce Tech';
}
