const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const url = 'mongodb://AndrewBubnov:acnot88_0175A@cluster0-shard-00-00-edszp.mongodb.net:27017,cluster0-shard-00-01-' +
    'edszp.mongodb.net:27017,cluster0-shard-00-02-edszp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const PORT = process.env.port || 5000;
let currentDB;
let dbConnectionError = false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/build/'));


const getUsers = async (req, res) => {
    if (!dbConnectionError) {
        try {
            const contacts = await currentDB.collection('dot_game').find().toArray();
            res.send(contacts);
        } catch (error) {
            res.status(503).send("Something wrong's happened on server. Please reload the page")
        }
    } else res.status(503).send('Can not connect to DB at the time. Please try again later')
}

app.get('/api/winner', async (req, res) => await getUsers(req,res))


app.get('/api/presets', async (req, res) => {
    const presets = {
        easyMode: {field: 5, delay: 2000},
        hardMode: {field: 15, delay: 900},
        normalMode: {field: 10, delay: 1000},
    }
    res.send(presets)
})

app.post('/api/winner', (req, res) => {
    currentDB.collection('dot_game').insertOne(req.body, async (err, result) => {
        if (err) res.status(503).send('An error adding record to DB occurred');
        else await getUsers(req,res);
    })
});

app.delete('/api/delete/:_id', (req, res) => {
    currentDB.collection('dot_game').deleteOne({_id: mongodb.ObjectID(req.params._id)}, async (err, result) => {
        if (err) res.status(503).send('An error deleting record in DB occurred');
        else await getUsers(req,res)
    });
})


MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) dbConnectionError = true;
    console.log("Connected correctly to DB server");
    dbConnectionError = false;
    currentDB = db.db("cluster0");
    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
});