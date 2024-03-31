const express = require('express');
const app = express();
const con = require('./config');

app.use(express.json());

app.get('/', (req, res) => {
    const data = con.query('select * from users', (err, result)=>{
        res.send(result);
    });
});

app.post('/', (req, res)=> {
    // const data = {name: "deepak yadav", username: "deepak.yadav@gmail.com", password: 12345678};
    const data = req.body;
    con.query('insert into users SET ?', data , (err, result, fields)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.put('/:id', (req, res)=>{
    const data = [req.body.name, req.body.username, req.body.password, req.params.id];
    con.query("update users set name = ?, username = ?, password = ? where id = ?", data, (err, result, fields)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.delete('/:id', (req, res) => {
    con.query('delete from users where id = ?', req.params.id, (err, result, field ) =>{
        if(err) throw err;
        res.send(result);
    });
});

app.listen(5000);
