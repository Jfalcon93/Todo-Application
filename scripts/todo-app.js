let todos = getSavedTodo()

// Filters stores all todos that have been filtered
const filters = {
    searchText: '',
    hideCompleted: false
}

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    const text = e.target.elements.newTodo.value.trim()
    e.preventDefault()
    console.log(text)
    if (text.length > 0) {
        todos.push({
            id: uuidv4(),
            title: text,
            completed: false
    })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.newTodo.value = ''
    } 
})

renderTodos(todos, filters)

// Listen for Search Todo
document.querySelector('#search-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

// Checkbox for Hiding Completed Tasks
document.querySelector('#hide-completed').addEventListener('change', (e) => {    
    filters.hideCompleted = e.target.checked 
    renderTodos(todos, filters)
})