const {Router} = require("express");
const router = Router();
let bodyParser = require('body-parser');
const toDos = require('./todos');
const jsonParser = bodyParser.json();
const mongoose = require('../../mongoose/mongoose')
require('../../models/ToDo.model');


const ToDo = mongoose.model("ToDos");


let id = 0;
ToDo
    .find()
    .sort({id: -1})
    .limit(1)
    .then(data => {
        if (data[0].id) {
            id = data[0].id + 1;
            return id;
        } else {
            id = 1;
            return id;
        }
    })
    .catch(e => console.log(e))


router.get("/", (req, res) => {
    ToDo
        .find({})
        .then(data => {
            res.json(data);
        })
        .catch(e => console.log(e))
});

router.post('/', jsonParser, function (req, res) {
    if (req.body.toDo.toString().length) {
        const todo = new ToDo({
            title: req.body.toDo,
            id: id,
        });
        todo.save()
            .then(todo => {
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