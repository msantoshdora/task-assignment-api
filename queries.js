const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'santoshdora',
  host: 'localhost',
  database: 'task_api',
  password: 'password',
  port: 5432,
})

const getTasks = (_request, response) => {
  pool.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      throw error
    }
    // add _tasks to the result
    response.status(200).json(results.rows)
})
}

const getTaskStatusCount = (_request, response) => {
  pool.query('SELECT COUNT(id), status FROM tasks GROUP BY status', (error, results) => {
    if (error) {
      throw error
    }
    const resultMap = formatTasksForStatus(results.rows);
    response.status(200).json(resultMap)
  })
}

function formatTasksForStatus(results){
  let statusMap = {};
  results.map(function(obj) {
    let status_key = obj.status+ "_tasks";
    statusMap[status_key] = obj.count;
  });
  return statusMap;
}

const getTaskStatusTimelineMetrics = (request, response) => {
  pool.query("SELECT to_char(created_at, 'YYYY-MM') as month_date, status, COUNT(id) FROM tasks GROUP BY status, created_at", (error, results) => {
    if (error) {
      throw error
    }
  let formattedResult = formatResults(results.rows);

  response.send(200, JSON.stringify(formattedResult));
})
}

function formatResults(results) {
  let map = {};
  let resultArray = [];
  results.map(function(obj) {
      let status_key = obj.status+ "_tasks";
      let date_key = obj.month_date;
      let val = map[date_key];
      if(val === undefined){
        val = {};
      }
      val[status_key] = obj.count;
      map[date_key] = val;
  });

  Object.keys(map).map((key) => resultArray.push({date: key, metrics: map[key]}));
  return resultArray;
}

const createTask = (request, response) => {
    let { name, status } = request.body
    if(status === null || status === undefined){
      status = 'open'
    }
    pool.query('INSERT INTO tasks (name, status) VALUES ($1, $2) RETURNING *', [name, status], (error, results) => {
      if (error) {
        console.log(`App crashed because of error ${error.reason}.`)
        response.status(403).send(`Task Not Created.`)
      } else {
        response.status(201).send(`Task added with ID: ${results.id}`)
      }
    })
}


const updateTask = (request, response) => {
    const id = parseInt(request.params.id)
    const { status } = request.body
  
    pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2',
      [status, id],
      (error, results) => {
        if (error) {
          console.log(`App crashed because of error ${error.message}.`)
        response.status(403).send(`Task Not Updated.`)
        } else {
          response.status(200).send(`Task modified with ID: ${id}`)

        }
      }
    )
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  getTaskStatusCount,
  getTaskStatusTimelineMetrics,
}
