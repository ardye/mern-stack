const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/item');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/db').db;

//Connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`Mongo DB Connected`);
  })
  .catch(err => {
    console.log(err);
  });

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.allowedNodeEnvironmentFlags.NOD_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Running the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
