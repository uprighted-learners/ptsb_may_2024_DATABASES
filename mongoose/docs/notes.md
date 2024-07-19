# Traditional Databases

**Database**:
- Types: 
  - Relational 
    - SQL, PostgreSql, MySQL
  - Non-Relational
    - MongoDB, Apache Cassandra, Couchbase
- Collection of tables or documents
- Tables:
  - Primary Keys (ID)
  - Records: Data within rows of table
- Mongo
  - Database = Database
  - Collections = Tables
  - Documents = Records
    - stored as JSON
  - Is a **Document Data Store**

![](assets/Database%20Concept.png)

# MERN
- M: Mongo
  - the database
- E: Express
  - the server
- R: React
  - the frontend/client
- N: Node
  - connection between the three.

# Express
- Need a `package.json` file
  - run `npm init` or `npm init -y`
- Install Dependencies:
  - Express: `npm i express`
  - Mongoose: `npm i mongoose`
    - package that connects to MongoDB
  - dotenv: `npm i dotenv`
  - **NOTE**:
    - We can install multiple dependencies at once
    - ex: `npm i express mongoose dotenv`
- Entry point within `package.json`
  - `index.js` or `app.js`
- `.gitignore`
  - ignore files/folders that shouldn't be in a repo.

# .env
- Contains constants that are specific for our environment
- Stores items that we don't want published
  - passwords, port numbers / deployment routes, keys
- Should be added to `.gitignore`
- Should have a sample version to communicate with team.
  - `example.env`

## Mongo & Mongoose
- Need to connect to our database
  - Using **MongoDBCompass**
  - Stateful connection

```js
const mongoose = require('mongoose');
const MONGO = process.env.MONGODB;

mongoose.connect(`${MONGO}/moviedb`);

const db = mongoose.connection;

db.once("open", () => log(`Connected: ${MONGO}`));
```

# Models
- Define what our database collection will look like.
  - A schema for each object being created.
  - `mongoose` establishes our schema.

Example:
```js
const UserSchema = new mongoose.Schema({
    // columns for our document
    firstName: {
        type: String, // What datatype this is expecting.
        require: true, // default is false.
    }
});
```