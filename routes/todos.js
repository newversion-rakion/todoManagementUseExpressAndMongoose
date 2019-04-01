const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo')


router.get('/', todoController.getTodos)

router.get('/:id', todoController.getTodoById)

router.post('/', todoController.createNewTodo)

router.put('/:id', todoController.updateTodoById)

router.delete('/:id', todoController.deleteTodoById)

router.delete('/', todoController.deleteAllTodos)

module.exports = router
