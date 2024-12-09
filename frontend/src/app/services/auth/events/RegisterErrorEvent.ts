export default class RegisterErrorEvent extends CustomEvent<unknown>
{
  constructor(error: any) {
    super('registerError', {detail: error});
  }

  public dispatch() {
    document.dispatchEvent(this);
  }
}
