# typesafe-redux

Utilities & helpers for increased type safety in a React + Redux application

# Example App

A basic example application (todo list) is provided at [examples/todos/](./examples/todos/) which showcases usage of this library to provide type safety in a React + Redux application.

# Creating Actions

This library offers a few different ways of creating actions or action creators, which are outlined below.

## Flux Standard Actions

The `actionCreator` method can be used to create flux standard action (FSA) factories, using the structure `const creator = customActionCreator(type)<PayloadType>();` to define the action type constant and shape of the payload:

```typescript
// With an object payload:
export const addTodo = customActionCreator('ADD_TODO')<{
  id: string;
  text: string;
  completed?: boolean;
}>();

// With a simple string payload:
export const deleteTodo = actionCreator('DELETE_TODO')<string>();
export const completeTodo = actionCreator('COMPLETE_TODO')<string>();

// Or with no payload at all:
export const completeAll = actionCreator('COMPLETE_ALL')();
```

Once the action type and payload shape have been defined using `actionCreator` those values will have types automatically applied when they're used in reducers, so you only have to type them once!

## Custom/Complex Actions

The `customActionCreator` method is provded for anytime an action creator takes arguments that differ from the payload shape (e.g. because of autogenerated timestamps or other computed values):

```typescript
// ID is generated in the action creator and doesn't need to be passed in:
export const addTodo = customActionCreator('ADD_TODO', (type) => {
  return (text: string, completed: boolean = false) => ({
    type,
    payload: {
      id: generateId(),
      text,
      completed
    }
  });
});
```

# Identifying Actions in Reducers

Action identification is typically done through a string comparison using `action.type`, but with `typesafe-redux` the action creator is capable of determining if it produced a given action via the `match` method injected into the prototype of action creators made using this library. You can either use this method directly or use the provided `isActionFrom` helper:

```typescript
function todos(state: IAppState['todos'] = [], action: Action) {
  if (isActionFrom(action, actions.addTodo)) {
    // The `isActionFrom` type guard strongly types `action.payload` within
    // this block as the payload type defined by the action creator
    return [ ...state, action.payload ];
  }
  // ...
}
```
