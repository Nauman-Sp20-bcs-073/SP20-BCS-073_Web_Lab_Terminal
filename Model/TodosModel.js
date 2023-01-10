const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, default:"New Novel"},
  author:{type:String, required: true, default: "User"},
  imgLink: {type: String, default: "https://play-lh.googleusercontent.com/uKdg2dQBQ-PYLEiJ4P5fZuqg3dqaKNaMQ2I5iwmW7xemQ13h2PCNG85r-YaK-7W0tg=w480-h960-rw"},
  done: {type:String, default: "NO"},
  dueDate: {type:String, default: String(new Date())}
});
const TodoModel = mongoose.models.todos || mongoose.model("todos", TodoSchema);
module.exports = TodoModel;