const mongoose = require('mongoose')
const express = require('express')
const PORT_NUM = 5000

COLLECTION_NAME = '300371570-rahul'
DB_NAME = 'BookList'
DB_SERVER = 'mongodb+srv://db_user:db_user2023@cluster0.oqakgk4.mongodb.net/'
//DB_SERVER = 'mongodb://localhost:27017/'

const app = express()

//define schema
const bookSchema = new mongoose.Schema({
     
    "title": {type: String, required:true}, 
    "author": {type: String, required:true},
    "description":{tyype:String}        
    })

// define model
const bookModel = new mongoose.model(COLLECTION_NAME, bookSchema)



app.use(express.json());


//setup CORS policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE")
    next();
  });



// Send a GET request /* 
app.get('/', async (req, res)=>{
  try {
      //get all books
      const data_docs = await bookModel.find()
      
    res.status(201).json({"message":"Books available: "+data_docs.length,"data":data_docs});
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: err});
  }
})


// Send a GET request for id /* 
app.get('/:id', async (req, res)=>{
  try {
      const some_id = req.params.id
      let data_doc =''
      if(some_id)
        data_doc = await bookModel.findById(some_id)
      else
        throw('No id provided')
      if(data_doc)
        res.status(201).json({"message":"Record found","data":data_doc});
      else
        throw('No book by the id:'+some_id)
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: err});
  }
})

// Send a POST request for / /* 
app.post('/', async (req, res)=>{
  try {
  
      const data =req.body.book

      const data_doc = await bookModel.create(data)
      if(data_doc)
        res.status(201).json({"message":"Book created with ID:"+data_doc._id,"data":data_doc});
      
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: err});
  }
})



// Send a PUT request for /:id /* 
app.put('/:id', async (req, res)=>{
  try {

      
      const data_doc = await bookModel.findById(req.params.id)
      const data = req.body.book
      for(some_key of Object.keys(bookSchema.obj))
        if(some_key in data)
          data_doc[some_key] = data[some_key]
      await data_doc.save()
    res.status(201).json({"message":"Book ID: "+req.params.id+" updated","data":data_doc});
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: err});
  }
})


// Send a Delete request for /:id /* 
app.delete('/:id', async (req, res)=>{
  try {
  
    await bookModel.deleteOne({'_id':req.params.id})
    res.status(201).json({"message":"Book ID: "+req.params.id+" deleted successfully"});
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: err});
  }
})



mongoose.connect(DB_SERVER+DB_NAME)

app.listen(PORT_NUM, () => console.log('API listening on port'+PORT_NUM));
