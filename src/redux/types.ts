export type AppState = {};

export type Action<TType extends string, TPayload = undefined> = {
  type: TType;
  payload: TPayload;
};
