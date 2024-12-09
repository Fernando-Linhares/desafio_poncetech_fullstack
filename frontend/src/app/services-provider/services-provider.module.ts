import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../services/auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {PersonService} from "../services/person.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgxMaskDirective
  ],
  providers: [
    AuthService,
    PersonService,
    provideNgxMask({})
]
})
export class ServicesProviderModule { }
