const PORT = process.env.PORT || 3000;

const express = require('express');
const {ObjectId} = require("mongodb");
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;

app.use(express.static('dist/konstructor'));

let db;

//new-user_15:xwpaFq4zz56SXP00
const JWT_secret = 'super_secret_key'
const uri = "mongodb+srv://new-user_15:xwpaFq4zz56SXP00@cluster0.jscdj.mongodb.net/kursovaya?retryWrites=true&w=majority";
const dbName = 'kursovaya';
const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoClient.connect(function (err, database) {
    if (err) {
        throw err;
    }
    db = database.db(dbName);
    app.listen(PORT, function () {
        console.log("App listening on port " + PORT);
    });
});


app.post('/api/authenticate', (req, res) => {
    if (!req.body) {
        res.status(500).send({
            errorMessage: 'Auth error!!!'
        })
    }
    db.collection('users1').findOne({username: req.body.username}, (err, result) => {
        if (err) {
            res.status(500).text().then(() => {
                res.send(err.message);
            })
            return;
        }
        if (result && req.body.username === result.username && req.body.password === result.password) {
            let token = jwt.sign(req.body, JWT_secret);
            res.status(200).send({
                signed_user: result,
                token: token
            });
            console.log('Ok!');
        } else {
            res.status(401).send({
                errorMessage: 'Something went wrong'
            })
        }
    });
});

app.get('/api/users', (req, res) => {
    db.collection('users1').find().toArray((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).text().then(() => {
                res.send(err.message);
            })
            return;
        }

        res.send(JSON.stringify(result));
    })
});

app.put('/api/updscore', (req, res) => {
    console.log(req.body._id);
    db.collection('users1').updateOne(
        {_id: ObjectId(req.body._id)},
        {
            $set: {
                score: req.body.score,
            }
        },
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).text().then(() => {
                    res.send(err.message);
                })
                return;
            }
            res.send(req.body);
        }
    );
});

app.post('/api/adduser', (req, res) => {
    if (!req.body) {
        res.status(500).send({
            errorMessage: 'No data received'
        })
    }
    db.collection('users1').findOne({username: req.body.username}, (err, result) => {
        if (err) {
            res.status(500).text().then(() => {
                res.send(err.message);
            })
            return;
        }
        if (result) {
            res.status(409).send(result);

            console.log('Already exists');
        } else {
            db.collection('users1').insertOne(req.body)
                .then(result => {
                    console.log('Saved to database');
                    req.body._id = result.insertedId;
                    res.status(200).send(req.body);
                })
                .catch(err => {
                    console.error(err.message);
                    res.status(500).send(err);
                })
            }
        })
});

