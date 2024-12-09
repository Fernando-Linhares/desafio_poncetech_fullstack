import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Session} from "./session.model";
import {User} from "./user.model";
import {catchError, lastValueFrom, throwError} from "rxjs";
import {Router} from "@angular/router";
import LoginEvent from "./events/LoginEvent";
import RegisterEvent from "./events/RegisterEvent";
import LoginErrorEvent from "./events/LoginErrorEvent";
import RegisterErrorEvent from "./events/RegisterErrorEvent";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private session!: Session;
  public static user: User|null;

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): void
  {
    this.http.post<any>(this.baseUrl + "/auth/login", {
      email,
      password
    })
      .pipe(catchError(this.handleLoginError))
      .subscribe((response) => {
        this.session = new Session(
          response.data.access_token,
          response.data.refresh_token,
          response.data.expires_at
        );
        this.store(this.session);
        let loginEvent = new LoginEvent();
        loginEvent.dispatch();
      });
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      let event = new LoginErrorEvent({
        type: {
          internal: true,
          user: false
        }
      });

      event.dispatch();
    } else {
      let event = new LoginErrorEvent({
        type: {
          internal: error.status >= 500,
          user: error.status >= 400 && error.status < 500
        },

      });

      event.dispatch();
    }

    return throwError(
      'Something bad happened; please try again later.');
  }

  private handleRegisterError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      let event = new RegisterErrorEvent({
        type: {
          internal: true,
          user: false
        }
      });

      event.dispatch();
    } else {
      let event = new RegisterErrorEvent({
        type: {
          internal: error.status >= 500,
          email: error.status >= 400 && error.error.Error == 'Email 11nand1777omail@gmail.com already exists'
        },
      });
      event.dispatch();
    }

    return throwError(
      'Something bad happened; please try again later.');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      let event = new LoginErrorEvent({
        type: {
          internal: true,
          user: false
        }
      });

      event.dispatch();
    } else {
      let event = new LoginErrorEvent({
        type: {
          internal: error.status >= 500,
          user: error.status >= 400 && error.status < 500
        },

      });

      event.dispatch();
    }

    return throwError('Something bad happened; please try again later.');
  }

  private async me(): Promise<User|null> {
    try {
      const headers = this.getLoggedHeaders();

      let { data } = await lastValueFrom(this.http.get<any>(this.baseUrl + "/auth/me", {headers}));

      let avatar =   './avatar-m.png'

      return new User(
        data.id,
        avatar,
        data.email,
        data.name,
        data.confirmed,
        data.active
      );
    }catch (error) {
      return null;
    }
  }

  public async getUserLoggedAsync(): Promise<User | null> {
      if(!AuthService.user) {
        AuthService.user = await this.me();
      }

      return AuthService.user;
  }

  public async fetchUser(): Promise<void> {
    AuthService.user = await this.me();
  }

  public getLoggedHeaders() {
    return { Authorization: 'Bearer '+ this.getSession()?.accessToken };
  }

  public register(name: string, password: string, email: string): any
  {
    this.http.post<any>(this.baseUrl + "/auth/register", {
      name,
      password,
      email
    })
      .pipe(catchError(this.handleRegisterError))
      .subscribe(response => {
        this.session = new Session(
          response.data.access_token,
          response.data.refresh_token,
          response.data.expires_at
        )
        this.store(this.session);
        let event = new RegisterEvent();
        event.dispatch();
      });

    return this.session;
  }

  public refresh() {
    this.http.put<any>(this.baseUrl + "/auth/refresh/" + this.getSession()?.refreshToken,
      {},
      {headers: this.getLoggedHeaders()}
    )
      .pipe(catchError(this.handleError))
      .subscribe(response => {
        this.session = new Session(
          response.data.access_token,
          response.data.refresh_token,
          response.data.expires_at
        )
        this.store(this.session);
      });

    return this.session;
  }

  private store(session: Session): void {
    localStorage.setItem('user_session', session.toJson());
  }

  public check(): boolean {
    let session: null|Session = this.getSession() ?? null;

    if (!session)
      return false;

    return !session.isExpired();
  }

  public getSession(): Session|null {
    return localStorage.getItem('user_session')
      ? this.getStoredSession()
      : null;
  }

  private getStoredSession(): Session {
    return Session.parse(localStorage.getItem('user_session') ?? '');
  }

  public logout(): void {
    localStorage.removeItem('user_session');
  }
}
