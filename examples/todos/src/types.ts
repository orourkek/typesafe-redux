export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface IAppState {
  todos: ITodo[];
}
