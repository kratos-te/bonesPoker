import { Action } from "./Action";

export interface AllowedAction {
  action: Action;
  allowed: boolean;
}

export interface RaiseActionParams {
  minRaise: number;
  maxBet: number;
}

export interface CallActionParams {
  callAmount: number;
}

export interface AllowedActions {
  actions: { [action in Action]?: boolean };
  params: RaiseActionParams & CallActionParams;
}
