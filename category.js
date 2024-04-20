const express = require('express')
const utils = require('../utils')
const database = require('../database')

const router = express.Router()

router.post('/', (req, res) => 
{
    const{ctitle, description} = req.body
    const query = `insert into category (ctitle, description) values(?, ?);`
    database.pool.execute(query, [ctitle, description], (error, result) => 
    {
        res.send(utils.createResult(error, result))
    })
})

router.get('/', (req, res) => 
{
    const {} = req.body
    const query = `select ctitle, description from category;`
    database.pool.execute(query, (error, category) =>
{
    res.send(utils.createResult(error, category))
})
})

module.exports = router