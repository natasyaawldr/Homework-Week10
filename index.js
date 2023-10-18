const express = require('express');
const pool = require('./models/queries');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser');
const path = require ('path');


const app = express();
const port = 3000;


pool.connect((err, res) => {
    console.log(err);
    console.log('connected');
  });

app.use(express.json());
app.use('/public/upload', express.static(path.join(__dirname + '/public/upload')));
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
