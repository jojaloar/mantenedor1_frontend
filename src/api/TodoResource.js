const API_URL = process.env.API_URL || "http://localhost:8080";

export default {

    put: (todo) => fetch(`${API_URL}/api/v1/tasks/${todo.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    }).then(response => response.json()),

    getAll: () => fetch(`${API_URL}/api/v1/tasks`)
        .then(response => response.json()),

    post: (todo) => fetch(`${API_URL}/api/v1/tasks`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    }).then(response => response.json()),

    delete: (todo) => fetch(`${API_URL}/api/v1/tasks/${todo.id}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    }).then(response => response.json())
}