const express = require('express');

const router = express.Router();
const pool = require('../modules/pool');

// Get all Tasks
router.get('/', (req, res) => {
        const queryText = 'SELECT * FROM "list" ORDER BY "status";';
        pool.query(queryText)
                .then(result => {
                        res.send(result.rows);
                })
                .catch(error => {
                        console.log('error getting tasks', error);
                        res.sendStatus(500);
                });
});

// POST
router.post('/', (req, res) => {
        const newTask = req.body;
        console.log('Adding new task', newTask);
        const queryText = `INSERT INTO "list"("task") VALUES($1);`;

        pool.query(queryText, [newTask.task])
                .then(result => {
                        res.sendStatus(201);
                })
                .catch(error => {
                        console.log(`Error adding new task`, error);
                        res.sendStatus(500);
                });
});

// PUT
router.put('/:id', (req, res) => {
        // const list = req.body;
        // const id = [req.params.id];
        const queryText = `UPDATE "list" SET "status" = 'completed' WHERE "id"= $1`;
        pool.query(queryText, [req.params.id])
                .then(result => {
                        res.sendStatus(201);
                })
                .catch(error => {
                        console.log(error);
                        res.sendStatus(400);
                });
});

// Delete
// router.delete('/:id', (req, res) =>{
//     let id = req.params.id;
//     console.log('Delete route called with id of', id);
//     res.sendStatus(500);
// });

router.delete('/:id', (req, res) => {
        console.log('in DELETE, removing task with ID:', req.params);
        // const { id } = req.params;
        const queryString = 'DELETE FROM "tasks" WHERE "id"=$1;';
        pool.query(queryString, [req.params.id])
                .then(result => {
                        console.log('deleted');
                        res.sendStatus(200);
                })
                .catch(err => {
                        console.log(err);
                        res.sendStatus(500);
                }); // end DELETE
}); // end DELETE

module.exports = router;
