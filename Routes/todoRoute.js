var express = require("express");
var router = express.Router();

const TodoModel = require("../Model/TodosModel") 

router.get("/:id", async function (req, res, next) {
    let newTodo = await TodoModel.findById(req.params.id);
    return res.send(newTodo);
  });
  
  //gets all todos
  router.get("/alltodos", async function (req, res, next) {
    let newTodos = await TodoModel.find();
    res.render("showcase.ejs", {newTodos})
    return res.send(newTodos);
  });

  router.get("/", async function (req, res, next) {
    let newTodos = await TodoModel.find();  
    return res.send(newTodos);
  });

  //post a todo
  router.post("/", async (req,res)=>{
    let newTodo = new TodoModel()
    newTodo.name = req.body.name;
    newTodo.author = req.body.author;
    newTodo.description = req.body.description;
    newTodo.done = req.body.done;
    newTodo.imgLink = req.body.imgLink;
    await newTodo.save();
   // req.flash("success", "Item was added Successfully!");
     return res.send(newTodo);
  })

    //post a todo
    router.post("/add", async (req,res)=>{
        let newTodo = new TodoModel()
        newTodo.name = req.body.name;
        newTodo.description = req.body.description;
        await newTodo.save();
       // req.flash("success", "Item was added Successfully!");
         return res.send(newTodo);
      })

  // edit a todo
  router.put("/:id", async function (req, res, next) {
    let newTodo = await TodoModel.findById(req.params.id);
    newTodo.name = req.body.name;
    newTodo.author = req.body.author;
    newTodo.description = req.body.description;
    newTodo.done = req.body.done;
    newTodo.imgLink = req.body.imgLink;
    await newNovel.save();
    return res.send(newNovel);
  });

  //delete a todo
  router.delete("/:id", async function (req, res, next) {
    try {
      let newTodo = await TodoModel.findById(req.params.id);
      await newTodo.delete();
      return res.send("deleted");
    } catch (err) {
      return res.status(400).send("Invalid Id");
    }
  });

  module.exports = router

