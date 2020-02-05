const { Router } = require("express");
const router = Router();
let bodyParser = require('body-parser');
const toDos = require('./todos')
const jsonParser = bodyParser.json();



router.get("/", (req, res) => {
    console.log(toDos)
    res.json(toDos);
});

router.post('/', jsonParser, function(req, res) {
    let id = toDos.length;
    if (req.body.toDo.toString().length){
        toDos.push({id :++id, title: req.body.toDo,});
        res.send( `200`, {data: `data successfully created`});
    }else{
        res.send(`<a href="/">Go back <a/>`)
    }

});





module.exports = router;