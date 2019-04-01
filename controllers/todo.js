const _ = require('lodash')
const todoModel = require('../models/todo')

module.exports = {

  getTodos: (req, res) => {

    const { query } = req

    todoModel.find(query, (error, todos) => {
      if(error) {
        return res.status(500).json({
          message: 'Error getting todo',
          error,
        })
      }

      return res.json(todos)
    })
  },

  getTodoById: (req, res) => {
    const { id } = req.params

    todoModel.findOne({ _id: id } ,(error, todo) => {
      if(error) {
        return res.status(500).json({
          message: 'Error getting todo',
          error,
        })
      }

      return res.json(todo)
    })
  },

  createNewTodo: (req, res) => {
    const { name, content, isComplete, createdDate } = req.body

    const todo = new todoModel({
      name,
      content,
      isComplete,
      createdDate,
    })

    todo.save((error, todo) => {
      if(error) {
        return res.status(500).json({
          message: 'Error saving user',
          error
        })
      }

      return res.json({
        message: 'Saved',
        id: todo._id
      })
    })
  },

  updateTodoById: (req, res) => {
    const { id } = req.params
    const { name, content, isComplete } = req.body

    todoModel.findOne({ _id: id }, (error, todo) => {
      if(error) {
        return res.status(500).json({
          error,
        })
      }

      if(!todo) {
        return res.status(404).json({
          message: 'No such todo',
        })
      }

      todo.name = name
      todo.content = content
      todo.isComplete = isComplete

      todo.save((error, todo) => {
        if(error) {
          return res.status(500).json({
            message: 'Error update todo',
            error,
          })
        }
  
        if(!todo) {
          return res.status(404).json({
            message: 'No such todo',
          })
        }

        return res.json(todo)
      })
    })
  },

  deleteTodoById: (req, res) => {
    const { id } = req.params
    todoModel.findByIdAndDelete({ _id: id }, (error, todo) => {
      if(error) {
        return res.status(500).json({
          message: 'Error delete todo',
          error,
        })
      }
      if(!todo) {
        return res.status(500).json({
          message: 'No such todo',
          error,
        })
      }

      return res.json(todo)
    })
  },

  deleteAllTodos: (req, res) => {
    todoModel.deleteMany((error, todos) => {
      if(error) {
        return res.status(500).json({
          message: 'Error deleting todos',
          error,
        })
      }

      return res.json(todos)
    })
  }

}