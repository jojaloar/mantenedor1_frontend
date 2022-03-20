export default function reducer(state, action) {
  if (Array.isArray(action.key)) {
    return state.setIn(action.key, action.payload)
  }
  if (action.key) {
    console.log(action)
    console.log(state)
    return state.set(action.key, action.payload)
  }
  switch (action.type) {
    case "FILTER":
      console.log('entro filterrrr')
      return state.setIn(['bikes','filter'], state.getIn(['bikes','all'])
      .filter(b=> b.title.toLowerCase()
      .includes(state.getIn([ 'search', 'title']).toLowerCase())))
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
