export default class LoginEvent extends CustomEvent<unknown>
{
  constructor() {
    super('login', {});
  }

  public dispatch() {
    document.dispatchEvent(this);
  }
}
