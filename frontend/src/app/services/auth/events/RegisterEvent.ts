export default class RegisterEvent extends CustomEvent<unknown>
{
  constructor() {
    super('register', {});
  }

  public dispatch() {
    document.dispatchEvent(this);
  }
}
