const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool')

toDoRouter.get('/', (req,res) => {
  console.log('In GET route');
  pool.query(`SELECT * FROM "todos"`)
  .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
  }).catch((error)=> {
      console.log('Error in GET', error);
      res.sendStatus (500)
  })
})


toDoRouter.post('/', (req, res) => {
  const newTasks = req.body;
  console.log(newTasks);
  const queryText = `
    INSERT INTO "todos"("name", "task", "notes", "taskStatus") 
    VALUES ($1, $2, $3, $4);
    `
  pool.query(queryText, [newTasks.name,  newTasks.task, newTasks.notes, newTasks.taskStatus ])
  .then((result) => {
    console.log(result.rows);
    res.sendStatus(201);
  }).catch((error) => {
    console.log(`error in POST /todolists`, error);
    res.sendStatus(500);
  })
})





module.exports = toDoRouter;