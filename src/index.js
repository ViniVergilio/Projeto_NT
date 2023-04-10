const express = require('express')
const  { Pool } = require('pg')
require('dotenv').config()

const PORT = 3333
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
app.listen(PORT,() => console.log(`server is running on ${PORT}`))

