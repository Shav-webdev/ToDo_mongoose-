const express = require("express");
// const methodOverride = require("method-override");
const homeRoute = require("./routes/home");
const toDoRouter = require("./api/todos/index");
let toDos = require('./api/todos/todos');
let bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const PORT = 3001;
const app = express();

// app.use(methodOverride("_method"));


app.use(express.static( __dirname + "/public"));
app.use(express.static( __dirname + "/src"));
app.use(express.static( __dirname + "/api"));
app.use(express.static( __dirname + "/ToDo"));

app.use("/", homeRoute);
app.use("/api/todos", toDoRouter);


app.delete("/api/todos/:id", function(req, res) {
    let id = parseInt(req.params.id, 10);
    toDos = toDos.filter(el => el.id !== id);
    res.json(toDos);
});

app.put('/api/todos/:id', jsonParser, function (req, res) {
    let id = parseInt(req.body.id, 10);
    let title = req.body.title.toString();
    console.log(toDos);
    toDos = toDos.map(toDo => {
        if (toDo.id === id) {
            toDo.title = title;
        }
        return toDo;
    })
    console.log(toDos);
    res.json({id: id, title: title});
    console.log("put body", req.body.title)


});


// app.get("/edit/:id", (req, res, next) => {
//     let toDo = globalStorage.filter((el) => {
//         return el.id === Number(req.params.id);
//     });
//     let id = toDo[0].id;
//     let title = toDo[0].title;
//     const data = { id: id, title: title };
//     res.render("edit", { toDo: data });
//     next();
// });

app.listen(PORT, (err) => {
    if (err) {
        console.log(err.message)
    }
    console.log("Server is running...");
});
