const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
})

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
      delete ret.__v
      ret.id = ret._id.toString()
      delete ret._id
  }
})

module.exports = mongoose.model('Todo', todoSchema)