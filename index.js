const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./src/config/config');
const app = express();

if (!require('dotenv').config()) {
  console.error('Error configurating process environment');
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const { db: { host, port, atlas_url } } = config;

mongoose.connect(atlas_url,{useNewUrlParser:true})
.catch((err) =>{
    console.log("Couldn't connect to Mongo: " + err);
});

mongoose.connection.once('open', () => {
  console.log("MongoDB is fully connected and operational");
});

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: ' + add);
})

app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});