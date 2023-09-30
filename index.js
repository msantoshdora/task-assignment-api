const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  
  app.get('/tasks', db.getTasks)
  app.get('/tasks/status', db.getTaskStatusCount)
  app.get('/tasks/timeline', db.getTaskStatusTimelineMetrics)
  app.post('/tasks', db.createTask)
  app.put('/tasks/:id', db.updateTask)
  
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })