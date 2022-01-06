function addTodo(e) {
    const value = todoInput.value;

    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(value);

    localStorage.setItem("todos", JSON.stringify(todos));
}
