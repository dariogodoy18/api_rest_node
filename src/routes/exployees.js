const express = require('express')
const router = express.Router()

//database connection
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employes', (err, rows, fields) => {
        if(!err){
            res.json(rows)
        }else{
            console.log(err)
        }
    })
})

router.get('/:id', (req, res) => {
   const { id }= req.params
   mysqlConnection.query('SELECT * FROM employes WHERE id_emplo = ?', [id], (err, rows, fields) => {
        if(!err){
            if(rows.length !== 0){
                res.json(rows)
            }
            else{
                res.send(`No se ha encontado empleado con el ID: " ${id} "`)
            }
        }else{
            console.log(err)
        }
   })
})

router.post('/', (req, res) => {
    const { id, name, salary } = req.body

    const query = 'CALL employeeAddOrEdit(?, ?, ?)'

    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Employeed Saved'})
        }else{
            console.log(err)
        }
    })
})

router.put('/:id', (req, res) => {
    const { name, salary } = req.body
    const { id } = req.params

    const query = 'CALL employeeAddOrEdit(?, ?, ?)'

    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Eployeed Updated'})
        }
    })
})

router.delete('/:id', (req, res) => {
    const { id }= req.params
    mysqlConnection.query('DELETE FROM employes WHERE id_emplo = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Eployeed Deleted'})
        }else{
            console.log(`Codigo de error ${err.sqlMessage}`)
        }
    })
})

module.exports = router;