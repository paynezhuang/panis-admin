/** The common type namespace */
declare namespace CommonType {
  /** The strategic pattern */
  interface StrategicPattern {
    /** The condition */
    condition: boolean;
    /** If the condition is true, then call the action function */
    callback: () => void;
  }

  /**
   * The option type
   *
   * @property value: The option value
   * @property label: The option label
   */
  type Option<K = string> = { value: K; label: string };

  type YesOrNo = 'Y' | 'N';

  /** add null to all properties */
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | null;
  };

  /** common Button dropdown */
  type ButtonDropdown<T, S> = {
    key: T;
    show: boolean;
    label: string;
    icon?: () => import('vue').VNodeChild;
    handler: (key: T, row: S) => void;
  };
}
