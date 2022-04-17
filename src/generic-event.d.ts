export interface EventAt<T extends EventTarget> extends Event {
  target: T;
}
