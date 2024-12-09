import { Component } from '@angular/core';
import {FooterComponent} from "../../../components/footer/footer.component";
import {HeaderComponent} from "../../../components/header/header.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ServicesProviderModule} from "../../../services-provider/services-provider.module";
import {AuthService} from "../../../services/auth/auth.service";
import LoginErrorEvent from "../../../services/auth/events/LoginErrorEvent";
import Swal from 'sweetalert2'
import {AuthPanelComponent} from "../../../components/authpanel/authpanel.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NgForOf,
    NgIf,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    ServicesProviderModule,
    AuthPanelComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  password = { text: '', visible: false, notValid: false };
  login = { text: '', notValid: false };
  form!: FormGroup;
  loading: boolean = false;
  loginFail: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
      this.form = this.formBuilder.group({
        login: ['', [Validators.required, Validators.email]],
        password: ['', [ Validators.required, Validators.minLength(6)]],
      });
      document.addEventListener('login', () => this.postLogin());
      document.addEventListener('loginError', event => {
        if(event instanceof LoginErrorEvent) {
          this.loginError(event.detail);
        }
        this.loading = false;
      });
  }

  private loginError(detail: any): void {
    if(detail.type.user) {
        this.loginFail = true;
    }

    if(detail.type.internal) {
      Swal.fire('Error', 'Internal Error, We\'re working to solve it', 'error');
    }
  }

  private postLogin(): void {
    this.loading = false;
    this.gotoDashboard();
  }

  ngOnInit(): void {
    if(this.authService.check()) {
      this.gotoDashboard();
    }
  }

  public onSubmit(event: any): void {
    event.preventDefault();
    if(this.form.valid) {
      this.loading = true;
      this.authService.login(
        this.form.value.login,
        this.form.value.password
      );
    }
  }

  private gotoDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public gotoRegister(): void {
    this.router.navigate(['/register']);
  }

  public gotoForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
