import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { nanoid } from 'nanoid'
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

let todos = [
    {
        todo: "Win Zarai heart :)",
        id: nanoid(9),
    }
]

app.use(express.static('../public'))

const PORT = process.env.PORT || 3000

// Return an array of all the todos
app.get('/api/todos', (req, res) => {
    
    res.status(200).json({
        data: todos
    })
})

// creates a todo and adds to database
app.post('/api/todos', (req, res) => {
    const { todo } = req.body
    const newTodo = {
        todo,
        id: nanoid(9)
    }
    todos.push(newTodo)

    res.status(200).json({
        newTodo,
        status: 'ok'
    })

})

// edits a todo 
app.put('/api/todos', (req, res) => {

    const { id, newTodo } = req.body

    todos = todos.map((todoObj) => {
        if (todoObj.id === id) {
            todoObj.todo = newTodo
            return todoObj
        }
        return todoObj
    })

    res.status(200).json({
        data: todos,
        status: "ok"
    })
})

//delete todos

app.delete('/api/todos', (req, res) => {
  const { id } = req.body

  todos = todos.filter(todoObj => {
    if (todoObj.id !== id) {
      return todoObj
    }
  })

  res.status(200).json({
    data: todos,
    status: 'ok',
  })
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
} )

