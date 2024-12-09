export default class LoginErrorEvent extends CustomEvent<unknown>
{
  constructor(error: any) {
    super('loginError', {detail: error});
  }

  public dispatch() {
    document.dispatchEvent(this);
  }
}
