// Import dotenv, allowing us access to the .env environment variables
require("dotenv").config();

const express = require("express");
const app = express();

const myPort = process.env.PORT || 8080;

// Importing the MongoClient DB
const { MongoClient, ObjectId } = require("mongodb");

// Assigning a connection to our local db server
let client = new MongoClient(process.env.DBSTRING);

// Allows our express server to receive json data
app.use(express.json());

// Creating a fn that will connect to our database and a specific table/collection
async function dbConnect() {
  try {
    // Connection to the db server
    await client.connect();

    // Creating or connecting to a specific db
    let db = client.db("testdb");

    // Assign a new variable to our collection/model/table
    let collection = db.collection("testtable");

    return collection;
  } catch (err) {
    console.log(err);
  }
}

app.post("/create", async (req, res) => {
  try {
    let newUser = {
      //? Optional to add _id, as mongodb will add it for you
      //    _id: new ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    let userColl = await dbConnect();

    await userColl.insertOne(newUser);

    res.status(200).json({
      Created: newUser,
      Status: "Success",
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
      Status: "Error",
    });
  }
});

app.get("/userdata", async(req,res) => {
    try{
        let userColl = await dbConnect();
        let results = [];

        let userList = userColl.find()

        // console.log("User List line 68:",userList)

        for await(item of userList){
            console.log(item);
            results.push(item)
        }

        res.status(200).json({
            Results: results
        })

    }catch(err){
        res.status(500).send("Error")
    }
})

app.get("/userdata/:id", async (req,res) => {
    let userColl = await dbConnect();

    let results = [];

    let userList = userColl.find({_id: new ObjectId(req.params.id)})


    for await(item of userList) {
        results.push(item)
    }

    res.json(results)
})

app.delete("/")

app.listen(myPort, () => {
  console.log(`Server is running on port: ${myPort}`);
});
