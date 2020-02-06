const {Router} = require("express");
const router = Router();
let bodyParser = require('body-parser');
const toDos = require('./todos');
const jsonParser = bodyParser.json();
const mongoose = require('../../mongoose/mongoose')
require('../../models/ToDo.model');


const ToDo = mongoose.model("ToDos");


router.get("/", (req, res) => {
    console.log(toDos);
    res.json(toDos);
});

router.post('/', jsonParser, function (req, res) {
    let id = toDos.length;

    if (req.body.toDo.toString().length) {
        toDos.push({
            id: ++id,
            title: req.body.toDo
        });
        const todo = new ToDo({
            title: req.body.toDo,
            id: id,
        });
        todo.save()
            .then(todo => {
                console.log(todo);
                res.send(`200`, {data: `data successfully created`});
            })
            .catch(e => {
                console.log(e)
                res.send(`400`, {data: `Oops, something has gone wrong `});
            });

    } else {
        res.send(`<a href="/">Go back <a/>`)
    }

});


module.exports = router;