
import TodoConsumer from "../../api/TodoConsumer";
import api from "../../api/TodoResource";

test("TodoConsumer #getAll", () => {
    jest.spyOn(api, "getAll");
    api.getAll = jest.fn(() => Promise.resolve([{name: "data"}]));
  
    return TodoConsumer.getAll((data) => {
        expect(data).toMatchObject({ isResult: 'success', data: [ { name: 'data' } ] })
    });
});

test("TodoConsumer #getAll-ERROR", () => {
    jest.spyOn(api, "getAll");
    api.getAll = jest.fn(() => Promise.reject());
  
    return TodoConsumer.getAll((data) => {
        expect(data).toMatchObject({"error": undefined, "isResult": "error"})
    });
});

test("TodoConsumer #add", () => {
    const todo = {name: "title"};
    jest.spyOn(api, "post");
    api.post = jest.fn(() => Promise.resolve(todo));
  
    return TodoConsumer.add(todo, (data) => {
         expect(data).toMatchObject({ isResult: 'success', item: { name: 'title' } })
    });
});

test("TodoConsumer #add-ERROR", () => {
    const todo = {name: "title"};
    jest.spyOn(api, "post");
    api.post = jest.fn(() => Promise.reject());
  
    return TodoConsumer.add(todo, (data) => {
        expect(data).toMatchObject({"error": undefined, "isResult": "error"})
    });
});

test("TodoConsumer #update", () => {
    const todo = {name: "title"};
    jest.spyOn(api, "put");
    api.put = jest.fn(() => Promise.resolve(todo));
  
    return TodoConsumer.update(todo, (data) => {
         expect(data).toMatchObject({ isResult: 'success', item: { name: 'title' } })
    });
});

test("TodoConsumer #update-ERROR", () => {
    const todo = {name: "title"};
    jest.spyOn(api, "put");
    api.put = jest.fn(() => Promise.reject());
  
    return TodoConsumer.update(todo, (data) => {
        expect(data).toMatchObject({"error": undefined, "isResult": "error"})
    });
});