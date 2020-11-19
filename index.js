const express = require('express');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const url =  "mongodb://localhost:27017";

const port =" https://kavin-mentor.herokuapp.com" || 3000;
//middlewares
app.use(bodyParser.json());
app.use(cors());


//Api to get mentor details
app.get('/mentor', async (req, res) => {
    try {
        let connection = await client.connect(url);
        let db = connection.db("mentor");
        let data = await db.collection("mentor_list").find().toArray();
        await connection.close();
        res.status(200).json(data);
    } catch (error) {
        res.json({ msg: error })
    }

})

//Api to add new mentors
app.post('/mentor', async (req, res) => {
    try {
        let connection = await client.connect(url);
        let db = connection.db("mentor");
        let data = await db.collection("mentor_list").insertOne(req.body);
        await connection.close();
        res.json({ msg: "Mentor details added successfully" });

    } catch (err) {
        console.log(err);
    }

})


//Api to detele mentor
app.delete('/mentor/:id', async (req, res) => {
    try {
        let connection = await client.connect(url);
        let db = connection.db("mentor");
        let deleteddata = await db.collection('mentor_list').deleteOne({ "_id": mongodb.ObjectID(req.params.id) });
        await connection.close();
        res.json({ msg: "Mentor details deleted successfully" });
    } catch (err) {
        res.json({ msg: "error in deleting details" })
    }
})


//Api to get student details
app.get('/student', async (req, res) => {
    try {
        let connection = await client.connect(url);
        let db = connection.db("mentor");
        let data = await db.collection("student_list").find().toArray();
        await connection.close();
        res.status(200).json(data);
    } catch (error) {
        res.json({ msg: error })
    }

})


//Api to add new Student
app.post('/student', async (req, res) => {
    try {
        let connection = await client.connect(url);
        let db = connection.db("mentor");
        let data = await db.collection("student_list").insertOne(req.body);
        await connection.close();
        res.json({ msg: "Student details added successfully" });

    } catch (err) {
        console.log("error: " + err);
    }

})

//Api to get particular students of a mentor
app.get('/student/:mentorname', async (req, res) => {
    try {
        let connection = await client.connect(url);
        let db = connection.db("mentor");
        let data = await db.collection("student_list").find({ "mentor": req.params.mentorname }).toArray();
        await connection.close();
        res.status(200).json(data);
    } catch (error) {
        res.json({ msg: error })
    }

})


//Api to detele student details
app.delete('/student/:id', async (req, res) => {
    try {
        let connection = await client.connect(url);
        let db = connection.db("mentor");
        let deleteddata = await db.collection('student_list').deleteOne({ "_id": mongodb.ObjectID(req.params.id) });
        await connection.close();
        res.json({ msg: "Student deatils deleted successfully" });
    } catch (err) {
        res.json({ msg: "error in deleting details" })
    }
})




app.listen(port, () => {
    console.log('Listening to port 3000');
})