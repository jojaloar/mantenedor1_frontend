import api from "../../api/TodoResource";

test("TodoResource #getAll", () => {
    const mockSuccessResponse = [{ item: "task 1" }, { item: "task 2" }];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.getAll().then((data) => {
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/tasks');
        expect(data).toMatchObject(mockSuccessResponse)
    });
});

test("TodoResource #post", () => {
    const todo = { item: "task 1" };
    const mockSuccessResponse = [{ success: "ok" }];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.post(todo).then((data) => {
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/tasks', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        });
        expect(data).toMatchObject(mockSuccessResponse)
    });
});

test("TodoResource #put", () => {
    const todo = { item: "task 1", id: 1 };
    const mockSuccessResponse = [{ success: "ok" }];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.put(todo).then((data) => {
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/tasks/1', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        });
        expect(data).toMatchObject(mockSuccessResponse)
    });
});
