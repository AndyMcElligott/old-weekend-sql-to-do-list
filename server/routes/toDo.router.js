const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Get all Tasks
router.get('/', (req, res)=>{
    let queryText = 'SELECT * FROM "list" ORDER BY "status";';
    pool.query(queryText).then(result => {
        res.sendStatus(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
      });
});