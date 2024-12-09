export class Session {

  private refreshTime = 30;
  private readonly _expiresAt = new Date();

  constructor(
    private _access_token: string,
    private _refresh_token: string,
    expiresTime: number
  ) {
    let date = new Date();
    date.setTime(expiresTime);

    this._expiresAt = date;
  }

  get accessToken(): string {
    return this._access_token;
  }
  get refreshToken(): string {
    return this._refresh_token;
  }
  get expiresAt(): Date {
    return this._expiresAt;
  }

  public isExpired(): boolean {
    return this.expiresAt < new Date();
  }

  public refreshable(): boolean {
    let expiresAt = this.expiresAt;
    expiresAt.setMinutes(expiresAt.getMinutes() - this.refreshTime);
    return new Date() > expiresAt;
  }

  public toJson(): string {
    return JSON.stringify({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      expiresAt: this.expiresAt
    })
  }

  public static parse(json: string): Session {
    let { accessToken, refreshToken, expiresAt } = JSON.parse(json);
    let date = new Date(expiresAt);

    return new Session(accessToken, refreshToken, date.getTime());
  }
}
