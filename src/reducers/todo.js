export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "COMPLETE":
      return {
        ...state,
        todos: state.todos.map(t => {
          if (t.id === action.payload.id) {
            t.isActive = !t.isActive;
          }
          return t;
        })
      };
    case "SET_TODO":
      return {
        ...state,
        todos: action.payload
      };
    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload.id)
      };
    default:
      return state;
  }
}
