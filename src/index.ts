interface BaseAction {
  readonly type: any;
}

interface Meta {
  [k: string]: any;
}

export interface Action<T extends string> extends BaseAction {
  readonly type: T;
  readonly payload?: any;
  readonly meta?: Meta;
  readonly error?: boolean;
}

/**
 * Any function that generates an action-like object
 */
export interface ActionBuilder<T extends string> {
  (...args: any[]): Action<T>;
}

/**
 * An action creator function produced by typesafe-redux
 */
export interface ActionCreator<T extends string> extends ActionBuilder<T> {
  type: T;
  match(action: BaseAction): action is Action<T>;
}

/**
 * Type guard for identifying typesafe-redux action creators
 */
function isMatchableActionCreator<T extends string>(
  builder: ActionBuilder<T>
): builder is ActionCreator<T> {
  return (
    typeof builder === 'function' && 'match' in builder && 'type' in builder
  );
}

/**
 * Creator of actions that accepts payload directly
 */
export function actionCreator<T extends string>(type: T) {
  return <P = void>() => customActionCreator(type, (innerType) => {
    return (payload: P) => ({
      type: innerType,
      payload
    });
  });
}

/**
 * Custom AC that can accept any arguments and return an action of any shape
 */
export function customActionCreator<
  T extends string,
  Builder extends ActionBuilder<T>,
>(
  type: T,
  creator: (type: T) => Builder
): Builder {
  return Object.assign(
    creator(type),
    {
      type,
      match(action: BaseAction): action is ReturnType<Builder> {
        return action.type === this.type;
      }
    }
  );
}

/**
 * Helper to determine if an action was created by the given action creator
 */
export function isActionFrom<
  T extends string,
  Builder extends ActionBuilder<T>
>(action: BaseAction, creator: Builder): action is ReturnType<Builder> {
  return isMatchableActionCreator(creator) && creator.match(action);
}
