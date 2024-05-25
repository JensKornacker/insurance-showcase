import {ReactiveNode, SIGNAL} from "@angular/core/primitives/signals";
import {ValueEqualityFn} from "@angular/core";

export interface CustomSignalNode<T> extends ReactiveNode{
  value: T;
  equal: ValueEqualityFn<T>;
  readonly[SIGNAL]: CustomSignalNode<T>;
}
