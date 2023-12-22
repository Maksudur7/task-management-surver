const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// i5ZN8wEwMsCxYvXm
// task-management-project


app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
    credentials: true
}))
app.use(express.json())




const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.gehw4nj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const userCollection = client.db('task-management').collection('users')
        const TaskCollection = client.db('task-management').collection('task')


        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await userCollection.insertOne(users)
            res.send(result)
        })
        app.get('/users', async (req, res) => {
            const user = req.body
            const result = await userCollection.find(user).toArray()
            res.send(result)
        })
        app.post('/task', async(req, res) =>{
            const task = req.body
            const result = await TaskCollection.insertOne(task)
            res.send(result)
        })


        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('task-managemetn-server is running')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})