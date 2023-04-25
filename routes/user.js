

DB_NAME = 'DB'
DB_SERVER = 'mongodb+srv://db_user:db_user2023@cluster0.oqakgk4.mongodb.net/'



//define schema
const sessionSchema = new mongoose.Schema({
     
    "user_id": mongoose.SchemaTypes.ObjectId, 
    "expiry": {type: Date,
            default: ()=> new Date(Date.now()+1000*60*TOKEN_EXPIRY_MINUTES)} 
    })

// define model
const sessionModel = new mongoose.model('session', sessionSchema)



// Send a POST request to /user/* 
router.post('/', async (req, res)=>{
    try {
    
        const data ={'user_id':'rahul'}
        const data_doc = await sessionModel.create(data)
      res.status(201).json({"message":"some_msg","data":data_doc});
    }
    catch(err) {
      console.log(err)
      res.status(500).json({message: err});
    }
  })
    