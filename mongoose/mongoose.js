const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ToDos", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Mongo db started ..."))
    .catch(e => console.log(e));

module.exports = mongoose;