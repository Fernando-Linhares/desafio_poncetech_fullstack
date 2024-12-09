import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {ServicesProviderModule} from "../../../services-provider/services-provider.module";
import {AuthService} from "../../../services/auth/auth.service";
import RegisterErrorEvent from "../../../services/auth/events/RegisterErrorEvent";
import Swal from "sweetalert2";
import {AuthPanelComponent} from "../../../components/authpanel/authpanel.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FooterComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    ServicesProviderModule,
    AuthPanelComponent,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = { text: '', visible: false, notValid: false };
  password = { text: '', visible: false, notValid: false };
  confirmPassword = { text: '', visible: false, notValid: false };
  loading: boolean = false;
  form!: FormGroup;
  registerFail: boolean = false;
  alreadyInUse = {email: false};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {
    document.addEventListener('register', () => this.postRegister())
    document.addEventListener('registerError', (event) => {
      if(event instanceof RegisterErrorEvent) {
        this.registerError(event.detail);
      }
      this.loading = false;
    });
  }

  private registerError(detail: any)
  {
    if(detail.type.email) {
      this.alreadyInUse.email = true;
      this.registerFail = true;
    }

    if(detail.type.internal) {
      Swal.fire('Error', 'Internal Error, We\'re working to solve it', 'error');
    }
  }

  private postRegister(): void {
    this.loading = false;
    this.gotoDashboard();
  }

  ngOnInit(): void {
    if(this.authService.check()) {
      this.gotoDashboard();
    }else {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      })
    }
  }

  private gotoDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public passswordPattern(): boolean
  {
    return /[a-z]/.test(this.form.value.password)
      && /[A-Z]/.test(this.form.value.password)
      && /[0-9]/.test(this.form.value.password)
      && /[\^_=\!#\$%&\(\)\*\+\-\.:'/\?@]/.test(this.form.value.password);
  }

  public async onSubmit(): Promise<void> {
    if(this.form.valid && this.form.value?.confirmPassword == this.form.value?.password) {
      this.loading = true;
      this.authService.register(
        this.form.value.name,
        this.form.value.password,
        this.form.value.email);
    }
  }

  public gotoLogin(): void {
    this.router.navigate(['/login']);
  }
}
