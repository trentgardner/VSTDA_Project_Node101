const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const toDoList = [{todoItemId:0, name:'an item', priority:3, completed:false},
    {todoItemId:1, name:'another item', priority:2, completed:false},
    {todoItemId:2, name:'a done item', priority:1, completed:true}
];

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({status: 'ok'});
});

app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(toDoList);
});

app.get('/api/TodoItems/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = toDoList.find(t => t.todoItemId === id);
    res.status(200).json(item);
});

app.post('/api/TodoItems', (req, res) => {
    toDoList.push(req.body);
    res.status(201).json(req.body);
});

app.delete('/api/TodoItems/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = toDoList.find(t => t.todoItemId === id);
    toDoList.splice(toDoList.indexOf(item), 1);
    res.status(200).json(item);
});



module.exports = app;
