const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// Parse application/json
app.use(bodyParser.json());

// DB Connection
const conn = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   '',
    database:   'crud_nodejs'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Database connected..');
});

// Show all products
app.get('/api/products', (req,res)=>{
    let sql = "SELECT * FROM products";
    let query = conn.query(sql, (err,results) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

// Show selected product
app.get('/api/product/:id', (req, res) => {
    let sql = "SELECT * FROM products WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

// Post new product
app.post('/api/add-product', (req,res) => {
    let data = {name:req.body.name, price:req.body.price};
    let sql = "INSERT INTO products SET ?";
    let query = conn.query(sql,data,(err,results) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

// Update product
app.put('/api/product/:id', (req,res) => {
    let sql = "UPDATE products set name='"+req.body.name+"', price='"+req.body.price+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

// Delete product
app.delete('/api/product/:id', (req, res) => {
    let sql = "DELETE FROM products WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

// Server listen
app.listen(3000, () => {
    console.log('Server started running at http://localhost:3000');
});