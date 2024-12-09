import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
// import {Person} from "../components/person-table/Person";
import {AuthService} from "./auth/auth.service";
import {environment} from "../../environments/environment";
import { Person } from '../components/person-table/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  public list(): Observable<any> {
    const headers = this.authService.getLoggedHeaders();
    return this.http.get(environment.baseUrl + '/person', {headers});
  }

  public delete(id: number): Observable<any> {
    const headers = this.authService.getLoggedHeaders();
    return this.http.delete<any>(environment.baseUrl + '/person/' + id, {headers});
  }

  public find(id: number): Observable<any> {
    const headers = this.authService.getLoggedHeaders();
    return this.http.get(environment.baseUrl + '/person/' + id, {headers});
  }

  public update(id: number, person: Person): Observable<any> {
    const headers = this.authService.getLoggedHeaders();
    this.dateToISOString(person);
    return this.http.put(environment.baseUrl + '/person/' + id, {
      name: person.name,
      email: person.email,
      birth_date: person.birth_date,
      active: person.active
    }, {headers});
  }

  public create(person: Person): Observable<any> {
    const headers = this.authService.getLoggedHeaders();
    this.dateToISOString(person);
    return this.http.post(environment.baseUrl + '/person', {
      name: person.name,
      email: person.email,
      birth_date: person.birth_date,
      active: person.active
    }, {headers});
  }

  private dateToISOString(person: Person): void {
    let dateObj = new Date(person.birth_date);
    person.birth_date = dateObj.toISOString();
  }
}
