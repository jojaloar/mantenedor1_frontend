import reducers from "../../reducers/todo";

test("adds todo", async () => {
  const state = { todos: [{ item: "a" }] };
  const newState = reducers(state, { type: "ADD_TODO", payload: { item: "b" } });

  expect(newState.todos).toEqual([{ item: "a" }, { item: "b" }]);
});


test("completes todo", async () => {
  const state = { todos: [{ item: "a", id: 1 }, { item: "b", id: 2 }] };
  const newState = reducers(state, { type: "COMPLETE", payload: 1 });

  expect(newState.todos).toEqual([{ "id": 1, "item": "a" }, { "id": 2, "item": "b" }]);
});

test("set todo", async () => {
  const state = { todos: [] };
  const all = [{ item: "a", id: 1 }, { item: "b", id: 2 }];
  const newState = reducers(state, { type: "SET_TODO", payload: all });

  expect(newState.todos).toEqual(all);
});

test("adds todo case null", async () => {
  const state = { todos: [{ item: "a" }] };
  const newState = reducers(state, { type: "ADD_TODO", payload: null });
  expect(newState.todos).toEqual([{ item: "a" }]);
});



test("default", async () => {
  const state = { todos: [] };
  const newState = reducers(state, {});
  expect(newState.todos).toEqual([]);
});

