export class LazyElementConfig {
  public get Assets(): string[] {
    return this.Scripts;
  }

  public set Assets(scripts: string[]) {
    this.Scripts = scripts;
  }

  public ElementName: string;

  public Scripts: string[];

  public Styles: string[];
}
