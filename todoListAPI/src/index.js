const express = require("express")
const db = require("../db/db")
const cors = require("cors")
const bodyParser = require("body-parser")

// setup express app
const app = express()
app.use(cors())
  

// Parse incoming req data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/api/hello',(req, res) => {
    res.status(200).send({
        success: true,
        message: 'Hello There'
    })
})

app.get('/api/todos',(req, res) => {
    res.status(200).send(db)
})

app.post('/api/todos',(req, res) => {
    const todo = {
        id: db[db.length-1].id + 1,
        title: req.body.title,
        description: req.body.description,
        status: "not finished"
    }

    if (!req.body.title) {
        return res.status(400).send({
            success: true,
            message: 'please input title.'
        })
    }else if(!req.body.description) {
        return res.status(400).send({
            success: true,
            message: 'please input description'
        })
    }

    db.push(todo)
    return res.status(201).send({
        success: true,
        message: 'todo added succesfully.',
        data: todo
    })
})

app.put('/api/todos/finished',(req, res) => {
    const index = req.body.index
    return res.status(201).send(db[index].status = "finished")
})

app.delete('/api/todos/',(req, res) => {
    const index = req.body.index
    db.splice(index,1)
    return res.status(201).send(db)
})

const PORT = 8001
app.listen(PORT,()=>{
    console.log("Server running on port")    
})