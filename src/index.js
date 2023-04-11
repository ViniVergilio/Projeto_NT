const express = require('express')
const  { Pool } = require('pg')
require('dotenv').config()

const PORT = 3334
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

const mongoose = require('mongoose')

const app = express()

//mongoose.connect()


app.use(express.json())


app.get('/', (req, res)=> {console.log('olá mundo')})

app.get ('/', async (req, res) => {
    try{
        const { rows } = await pool.query('SELECT * FROM users')
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})

app.post('/session', async(req, res) => {
    const { username } = req.body
    let user = ''
    try {
        user = await pool.query(' SELECT * FROM users WHERE emp_id = ($1)', [username])
        if(!user.rows[0]) {
            user = await pool.query('INSERT INTO users(emp_id) VALUES($1) RETURNING *',[username])

        }
        
        return res.status(200).send(user.rows)
    } catch(err){
        return res.status(400).send(err)
    }
})

app.post ('/projects/:pro_id', async(req,res) =>{
    const {description, done } = req.body
    const {pro_id } = req.params
    try{
        const newProject = await pool.query('INSERT INTO projects (pro_id, cli_id,  pro_cod, pro_desc, pro_ini, pro_fin, pro_ativ) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *', [projectid, clientid, description, prodatainicio, prodatafinal, ativo])
        return res.status(200).send(newProject.rows)
    }catch(err) {
        return res.status(400).send(err)
        }
    })

app.get('/projects/:emp_id', async (req,res) =>{
    const {emp_id} = req.params
    try {
        const allProjects = await pool.query('SELECT * FROM projects WHERE emp_id = ($1)', [emp_id])
        return res.status(200).send(allProjects.rows)
    } catch(err) {
        return res.status(400),send(err)
    }
})

app.post ('/task/:tas_id', async(req,res) =>{
    const {description, done } = req.body
    const {tas_id } = req.params
    try{
        const newtask = await pool.query('INSERT INTO task (tas_id, pro_id, emp_id, tas_desc, pro_ini, pro_fin, tas_ativ) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *', [taskid, proid, empid, tasdatainicio, tasdatafinal, tasativo])
        return res.status(200).send(newtask.rows)
    }catch(err) {
        return res.status(400).send(err)
        }
    })

app.get('/tasks/:tas_id', async (req,res) =>{
    const {tas_id} = req.params
    try {
        const allTasks = await pool.query('SELECT * FROM tasks WHERE tas_id = ($1)', [tas_id])
        return res.status(200).send(allTasks.rows)
    } catch(err) {
        return res.status(400),send(err)
    }
})


app.post ('/users/:emp_id', async(req,res) =>{
    const {description, done } = req.body
    const {emp_id } = req.params
    try{
        const newEmp = await pool.query('INSERT INTO users ( emp_id, emp_name, emp_email, emp_tel, emp_ativ) VALUES ($1, $2, $3, $4, $5,) RETURNING *', [userid,username, usermail, usertel, userativo])
        return res.status(200).send(newEmp.rows)
    }catch(err) {
        return res.status(400).send(err)
        }
    })

app.get('/users/:emp_id', async (req,res) =>{
    const {emp_id} = req.params
    try {
        const allUsers = await pool.query('SELECT * FROM users WHERE tas_id = ($1)', [emp_id])
        return res.status(200).send(allUsers.rows)
    } catch(err) {
        return res.status(400),send(err)
    }
})

app.post ('/clients/:cli_id', async(req,res) =>{
    const {description, done } = req.body
    const {cli_id } = req.params
    try{
        const newCli = await pool.query('INSERT INTO clients (( cli_id, cli_cnpj,  cli_name, cli_email, cli_tel, cli_ativ) VALUES ($1, $2, $3, $4, $5,) RETURNING *', [cliid, clicnpj, climail, clitel, cliativo])
        return res.status(200).send(newCli.rows)
    }catch(err) {
        return res.status(400).send(err)
        }
    })

app.get('/cli/:cli_id', async (req,res) =>{
    const {cli_id} = req.params
    try {
        const allClients = await pool.query('SELECT * FROM users WHERE tas_id = ($1)', [emp_id])
        return res.status(200).send(allClients.rows)
    } catch(err) {
        return res.status(400),send(err)
    }
})


   
app.listen(PORT,() => console.log(`server is running on ${PORT}`))

