require ('dotenv').config();
const express = require('express');
const massive = require('massive');
const app = express();
const { getAll, getOne, update, create, deleteFn } = require('./db/products_controller') 

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}

}).then(db => {
    app.set('db', db);
    console.log('connected to database')
}).catch(err => console.log(err));

app.get('/api/products', getAll);
app.get('/api/products/:id', getOne);
app.put('/api/products/:id', update);
app.post('/api/products', create);
app.delete('/api/products/:id', deleteFn);

app.listen(SERVER_PORT, () => {console.log(`Server is listening on port: ${SERVER_PORT}`)});
