import {environment} from "../../../environments/environment";

export class User {
  constructor(
    private _id: number,
    private _avatar: string,
    private _email: string,
    private _name: string,
    private _confirmed: boolean,
    private _active: boolean
  ) {
  }

  get id(): number  {
    return this._id;
  }
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get email_truncate(): string {
    if(this._email.length > 20) {
      return this._email.substring(0, 20) + '...';
    }

    return this._email;
  }

  get name_truncate(): string {
    if(this._name.length > 20) {
      return this._name.substring(0, 20) + '...';
    }
    return this._name
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value;
  }

  get confirmed(): boolean {
    return this._confirmed;
  }

  set confirmed(value: boolean) {
    this._confirmed = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }

  get hasAvatarDefault(): boolean {
    return this.avatars?.filter(a => a.active)?.length > 0;
  }

  get avatars(): Array<any> {
    return [
      {
        src: environment.baseUrl + '/avatar-m.png',
        name: 'male',
        active: environment.baseUrl + '/avatar-m.png'
          == this._avatar
      },
      {
        src: environment.baseUrl + '/avatar-f.png',
        name: 'female',
        active: environment.baseUrl + '/avatar-f.png'
          == this._avatar,
      }
    ];
  }
}
