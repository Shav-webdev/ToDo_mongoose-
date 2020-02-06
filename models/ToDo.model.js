const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        min: 1,
    }
});

mongoose.model("ToDos", ToDoSchema)
module.exports = ToDoSchema;