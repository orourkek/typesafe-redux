interface AnyAction {
  readonly type: any;
}

interface Meta {
  [k: string]: any;
}

interface Action<T extends string> extends AnyAction {
  readonly type: T;
  readonly payload?: any;
  readonly meta?: Meta;
  readonly error?: boolean;
}

/**
 * Any function (i.e. not from this pkg) that generates an action-like object
 */
interface GenericActionCreator<T extends string> {
  (...args: any[]): Action<T>;
}

/**
 * An action creator function produced by typesafe-redux, which means it has
 * a `match` method on its prototype for type guarding actions which provides
 * strong payload types in consumers of this action(s)
 */
interface TRActionCreator<T extends string> extends GenericActionCreator<T> {
  type: T;
  match(action: AnyAction): action is Action<T>;
}

/**
 * Type guard for identifying `TRActionCreator` functions
 */
function isTRActionCreator<T extends string>(
  builder: GenericActionCreator<T>
): builder is TRActionCreator<T> {
  return (
    typeof builder === 'function' && 'match' in builder && 'type' in builder
  );
}

/**
 * Factory for custom AC that can accept any args and return any shape action
 *
 * Providing accurate & strong types around these kind of functions ended up
 * necessitating two layers of function calls which you'll see in the examples
 * below. First pass an action type, then add a generic type for the payload
 * (optional), then immediately call the result of that to get the frehsly
 * minted action creator.
 *
 * Optional 2nd arg is a callback that receives back the action type and
 * should return a function that returns an action of that type, Allowing
 * for the shape/type of arguments to differ from that of the final action.
 *
 * Without the second argument the returned action creator works like an FSA
 * creator, optionally accepting a payload type as a generic between the func
 * calls. This limits the payload to a single value which means POJOs if more
 * complexity is needed.
 *
 * Return types are explicitly asserted and have been carefully crafted to
 * maximize information & type safety.
 *
 * ```ts
 * import { actionCreator } from 'typesafe-redux';
 * // simple action without payload:
 * const logout = actionCreator('logout')();
 * dispatch(logout());
 *
 * // payload type can be passed as a generic between the function calls:
 * const showMsg = actionCreator('showMsg')<{ title: string; msg: string; }>();
 * const submitScore = actionCreator('submitScore')<number>();
 * dispatch(showMsg({ msg: 'hello world', title: 'this is a messgae' }));
 * dispatch(submitScore(100));
 *
 * // easily customize AC arguments by passing the optional callback:
 * const showError = actionCreator('showError', (type) => {
 *   return (msg: string, severity: number = 0, extra?: any) => ({
 *     type,
 *     timestamp: Date.now(),
 *     severity,
 *     extra,
 *   });
 * });
 * dispatch(showError('oops! something went wrong :(', 5));
 * ```
 */
export function actionCreator<
  T extends string
>(type: T): <P = void>() => (payload: P) => { type: T; payload: P; };
export function actionCreator<
  T extends string,
  InnerCreator extends GenericActionCreator<T>,
>(type: T, customCreatorCallback: (type: T) => InnerCreator): InnerCreator;
export function actionCreator<
  T extends string,
  InnerCreator extends GenericActionCreator<T>,
>(
  type: T,
  customCreatorCallback?: (type: T) => InnerCreator
) {
  return Object.assign(
    customCreatorCallback ?
      customCreatorCallback(type) :
      <P = void>(payload: P) => ({ type, payload }),
    {
      type,
      match(action: AnyAction): action is ReturnType<InnerCreator> {
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
  Builder extends GenericActionCreator<T>
>(action: AnyAction, creator: Builder): action is ReturnType<Builder> {
  return isTRActionCreator(creator) && creator.match(action);
}
