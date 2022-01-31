// $npm init
// $npm install express mongodb body-parser cors
// $npm install nodemon --save-dev

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')


const app = express()

const port = 5000


app.use(cors());
app.use(bodyParser.json());


const { MongoClient } = require('mongodb');
const { response } = require('express');
const uri = "mongodb+srv://hotelnightqueenadmin:hotelnightqueenadmin24@cluster0.d1hvr.mongodb.net/hotelNightQueen?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const hotelbookings = client.db("hotelNightQueen").collection("bookings");
  console.log("db connected successfully");

  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    hotelbookings.insertOne(newBooking)
    .then(result => {
      console.log(result);
    })
    // console.log(newBooking);
  })

  app.get('/bookings', (req, res) => {
    // console.log(req.query.email);
    hotelbookings.find({email: req.query.email})
    .toArray((err, documents) => {
      res.send(documents)
    })    
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)
