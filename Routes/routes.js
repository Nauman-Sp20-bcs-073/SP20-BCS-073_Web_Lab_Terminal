const express = require('express')
const ProductTable = require("../Model/SchemaOfProducts")
const router =express.Router()

const todoModel = require("../Model/TodosModel")

router.get("/", (req,res)=>{
    const token=req.cookies.token; //retrieve token
    if(token) return res.redirect('/');
    
    
})

router.get("/products", async (req,res)=>{
    // have to find table before we can send the JSON Api
    let productApi = await ProductTable.find()
    res.send(productApi)
})

router.get("/showcase", async (req,res)=>{
    let products = await todoModel.find()
    res.render("showcase.ejs", {products}) //we can pass can obj to ejs layout to use embedded JS
})

router.get("/add", (req,res)=>{
    res.render("addform.ejs")
})

// localhost:4000/route1/add is entered in POSTMAN for POST method.
// route1/add is entered in form action for POST as well
router.post("/add", async (req,res)=>{
    const postTable = new ProductTable() // need an obj of model
    postTable.title = req.body.title
    postTable.description = req.body.description
    postTable.price = req.body.price
    await postTable.save()
    res.send("Successfuly Posted data")
})

router.post("/search", async (req,res, next) => {
    //let products = await ProductTable.findOne({title: req.body.title })
    //let products = await ProductTable.aggregate([{ $match: { title: req.body.title } }])
    let products = await todoModel.find({title: {$regex:req.body.title} }) 
    
    //console.log("Product = " + products + "Length =" + products.length)

    if (products.length !== 0){
        products.queryword = req.body.name
        res.render("searchedGame.ejs", {products})
    }
    else
    {
    products = [{name:"Not Found!", description:"Sorry, but we didn't found any results match your search.", price:"0", queryword:req.body.title}]
    res.render("searchedGame.ejs", {products})
    }
})

// req = request = data incoming
router.put("/:id", async (req,res)=>{
let EditableApi = await ProductTable.findById(req.params.id)
EditableApi.title = req.body.title
EditableApi.description = req.body.description
EditableApi.price = req.body.price
await EditableApi.save()
res.send(EditableApi)

})

// indirect delete method, we use Get. In postman, method must also be set to GET then appropiate link
// "del/id" will find and delete the entire record
router.get("/del/:id", async(req, res)=>{
    let delProduct = await ProductTable.findById(req.params.id)
    await delProduct.delete()
    res.send(`Deletion of record with ID was successful`)
})

// direct delete
router.delete('/:id',async (req,res)=>{
    const product=await ProductTable.findByIdAndDelete(req.params.id);
    res.send(product);
})



// edits name only
router.put("/editname/:id", async (req,res)=>{
    let editNameOfProduct = await ProductTable.findById(req.params.id)  
    await ProductTable.findByIdAndUpdate(req.params.id,{title:req.body.title})
    res.send('Name was updated from')
}
)

module.exports = router