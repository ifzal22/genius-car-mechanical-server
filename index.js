

const express = require("express");
const cors = require("cors");
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()
/* const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqdph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`; */
// console.log(uri)

const uri = "mongodb+srv://my-data:t37M5uDatEzzpQoy@cluster0.pqdph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());


app.get("/",(req, res)=>{
    res.send("HEllow world");
});






async function run() {
    try {
      await client.connect();

      const database = client.db("CAr-MECHANIC");
      const servicesCollection = database.collection("SERvices");
      // create a document to insert

// GET API
app.get('/services', async(req,res) =>{
  const cursor = servicesCollection.find({});
  const services = await cursor.toArray();
  res.send(services);
})

// DELETED API

app.delete('/services:id', async(req,res)=>{
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await servicesCollection.deleteOne(query);
  res.json(result);

})

     // GET Single Service
     app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      console.log('getting specific service', id);
      const query = { _id: ObjectId(id) };
      const service = await servicesCollection.findOne(query);
      res.json(service);
  })

//    POST API
app.post('/services', async(req, res)=>{
  const service = req.body;
 console.log('hit the post api', service);
  res.send('post hitting')

const result = await servicesCollection.insertOne(service)
console.log(result);
res.json(result)
})
  
     
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);





app.listen(port, () =>{
    console.log("Running server port");
});
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    // client.close();
  });





