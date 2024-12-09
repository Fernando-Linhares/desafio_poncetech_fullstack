import {Submodule} from "./Submodule";

export class Link implements Submodule
{
  name: string;
  link: string;
  active: boolean;

  constructor(name: string, link: string, active: boolean) {
    this.name = name;
    this.link = link;
    this.active = active;
  }
}
