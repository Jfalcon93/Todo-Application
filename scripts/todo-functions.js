// Fetch the Saved Todos from Local Storage
const getSavedTodo = () => {
    const todoJSON = localStorage.getItem('todos')
    
    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        return []   
    }
}

// Save Todo to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove Todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle whether a Todo is complete or incomplete
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    
    if (todo) {
        todo.completed = !todo.completed
    }
    
    
}

// Function to Render Filtered Todos onto Screen
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todo')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })
    
    const count = filteredTodos.filter((todo) => !todo.completed)
    
    document.querySelector('#todo-count').innerHTML = ''
    todoEl.innerHTML = ''
    
    // Counts total Todos
    const todoCount = generateSummaryDOM(count)
    document.querySelector('#todo-count').appendChild(todoCount)
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            const todoElement = generateTodoDOM(todo)
            todoEl.appendChild(todoElement)
    })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No todos to show'
        todoEl.appendChild(messageEl)
    }
    
}

// Get DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    // Create elements
    const todoElement = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')
    
    // Checkbox Stuff
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = todo.completed
    containerEl.appendChild(checkboxEl)
    checkboxEl.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    
    // Set Title
    textEl.textContent = todo.title
    containerEl.appendChild(textEl)
    
    // Setup Container
    todoElement.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoElement.appendChild(containerEl)
    
    // Set Button
    button.textContent = 'Remove'
    button.classList.add('button', 'button--text')
    todoElement.appendChild(button)
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    
    
    return todoElement
}

// Get the DOM elements for the list Summary
const generateSummaryDOM = (count) =>{
    const todoCount = document.createElement('h2')
    const plural = count.length === 1 ? '' : 's'
    todoCount.classList.add('list-title')
    todoCount.textContent = `You have ${count.length} todo${plural} left.`
    return todoCount
}

dragElement(document.querySelector('#mydiv'))
// Make Todo List Draggable
function dragElement (el) {
    let pos1 = 0, pos2 = 0, pos3 = 0 , pos4 = 0;
    el.onmousedown = dragMouseDown
    
    function dragMouseDown (e) {
        e = e || window.event
        e.preventDefault()
        
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }
    
    function elementDrag (e) {
        e = e || window.event
        e.preventDefault()

        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY

        el.style.top = (el.offsetTop - pos2) + 'px'
        el.style.left = (el.offsetLeft - pos1) + 'px'
    }
    
    function closeDragElement () {
        document.onmouseup = null
        document.onmousemove = null
    }
}
