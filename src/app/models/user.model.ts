//
// Domain class
//

export class User {

  private _name: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get name(): string {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }
}
