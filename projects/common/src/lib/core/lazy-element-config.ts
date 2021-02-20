export class LazyElementConfig {
  public Assets?: string[];

  public ElementName: string;

  public Scripts?: string[];

  public Styles?: string[];
}

export class LazyElementToken {
  public Name: string;

  public StateKey?: string;
}
