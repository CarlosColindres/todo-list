const app = document.getElementById("app")

const inputContDiv = document.createElement('div')
inputContDiv.setAttribute('class', 'inputContainer')

const input = document.createElement('input')

input.setAttribute('type', 'text')

let inputValue 

input.addEventListener('keyup', (e) => {
    inputValue = e.target.value.trim()

    console.log(inputValue)
})

const submitBtn = document.createElement('button')
submitBtn.textContent = 'Submit'
submitBtn.addEventListener('click', async (e) => {
    try {
    const res = await fetch('/api/todos', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({todo: inputValue}), // body data type must match "Content-Type" header
    })
        const data = await res.json()
        const todolist = document.getElementById('todolist')
        const li = document.createElement('li')
        li.setAttribute('data-id', data.newTodo.id)
        li.textContent = data.newTodo.todo

        todolist.appendChild(li)
    } catch (error) {
        console.error(error)
    }
})
inputContDiv.appendChild(input)
inputContDiv.appendChild(submitBtn)

app.appendChild(inputContDiv)

window.addEventListener('load', async (e) => {
    try {
        const data = await fetch('/api/todos')
        const res = await data.json()
        
        const todolist = document.getElementById('todolist')
        
        res.data.forEach(({id, todo}) => {
            console.log(todo)
            const li = document.createElement('li')
            li.setAttribute("data-id", id)
            li.textContent = todo

            todolist.appendChild(li)
        })
        getNewData()
    } catch (error) {
        console.error(error)
    }
    
})

