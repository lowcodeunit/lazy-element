export class LazyElementConfig {
  public Assets?: string[];

  public ElementName: string;

  public Scripts?: string[];

  public Styles?: string[];
}

export class LazyElementToken {
  /**
   * The actions to invoke, where the object key is the even name,
   * and the value is the property from LCUServiceSettings to invoke.
   */
  public ActionKeys?: { [event: string]: string };

  public Name: string;

  public StateKey?: string;
}
