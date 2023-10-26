const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";

    db.query(sql, (err, result) => {
        if(err){
            console.log(err); 
            res.status(500).send("Ada yang error di server");
        }
        response(200, result, "get all data from mahasiswa", res);
    });

});

app.get("/find", (req, res) => {
    const sql = `SELECT nama_lengkap FROM mahasiswa WHERE nim = ${req.query.nim}`;
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send("Ada yang error di server");
        }
        response(200, result, "get data by nim", res);
    })
    console.log('find nip: ', req.query.nim);
});

app.post("/login", (req, res) => {
    console.log({requestFormOutside: req.body})
    const username = req.body.username;
    if(username === usernameFormDbExist){
        res.status(400).send("username sudah ada");
    }
    res.send("login berhasil");
});

app.put("/username", (req, res) => {
    console.log({requestFormOutside: req.body})
    res.send("username berhasil diubah");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
