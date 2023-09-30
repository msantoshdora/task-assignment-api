
Problem Statement: You are tasked with building a system to keep track of your tasks. You will need to write CRUD APIs for managing tasks and API to get the metrics for your tasks. You should use Node.js for the backend, any SQL database for managing database interactions.
API to create a task.
API to update a task
API to get all tasks.
API to get task metrics like counts tasks on basis of status and timeline Example:
{
"open_tasks": 10,
"inprogress_tasks": 30,
"completed_tasks": 50
}

[

{
"date": "July 2023",
"metrics": {
"open_tasks": 0,
"inprogress_tasks": 0,
"completed_tasks": 30
}
},
{
"date": "August 2023",
"metrics": {
"open_tasks": 10,
"inprogress_tasks": 30,
"completed_tasks": 50
}
}
]

-----------------------------------------------------------------
Pre-requisite:
1. Install NodeJS
2. Install express
3. Install postgreSQL

Database commands and requirement:

1. Create a task_api database with user 'santoshdora'(or change it to your and update that in queries.js)
2. SQL command to create tasks table in database:

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at DATE NOT NULL DEFAULT CURRENT_DATE);

To run the server, command:
 node index.js


Use Postman or Insomnia to hit APIs:
1. curl --request GET \
  --url http://localhost:3000/tasks/timeline \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'

2. curl --request GET \
  --url http://localhost:3000/tasks/staus \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'

3. curl --request GET \
  --url http://localhost:3000/tasks \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'

4. curl --request POST \
  --url http://localhost:3000/tasks \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "task21"
}'