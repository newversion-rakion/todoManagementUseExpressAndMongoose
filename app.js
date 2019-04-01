const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')
const keys = require('./config/keys')

const routes = require('./routes')
const todos = require('./routes/todos')

mongoose.connect(keys.DB_LOCAL,  {useNewUrlParser: true})
  .then(() => console.log(`Database is connecting on ${keys.DB_LOCAL}`))
  .catch((error) => console.log(error))
  
mongoose.set('useCreateIndex', true)

const app = express()

// Implement view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Static
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cookieParser())


app.use('/', routes)

app.use('/todos', todos)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(keys.PORT, () => console.log(`Server is running on port: ${keys.PORT}`))