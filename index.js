const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    response(200, "API V1 Ready To Fired", "SUCCESS", res);
});

app.get("/mahasiswa", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, result) => {
        if (err) throw err;
        response(200, result, "get list of mahasiswa", res);
    });
});

app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim;
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        response(200, result, "get detail of mahasiswa", res);
    });
});

app.post("/mahasiswa", (req, res) => {
    const { nim, namaLengkap, kelas, alamat } = req.body;

    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`;
    db.query(sql, (err, result) => {
        if (err) {
            if(err.errno == 1062){                
                response(400, "Gagal menambahkan data", "NIM sudah terdaftar", res);
            }

            if (err.errno == 1054){
                response(400, "Gagal menambahkan data", "Data tidak lengkap", res);
            } 

            throw err
        }else {
            if(result.affectedRows > 0){
                const sql = `SELECT * FROM mahasiswa WHERE id = ${result.insertId}`
                db.query(sql, (err, result) => {
                    if (err) throw err
                    response(201, result ,"Berhasil Menambahkan Mahasiswa", res);
                });
            }
        }
    });
});


app.put("/mahasiswa", (req,res) => {
    const {nim, namaLengkap, kelas, alamat} = req.body;

    const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}
    `

    db.query(sql, (err, result) => {
        if(err) response(500, "invalid", "error", res)

        if(result.affectedRows > 0){
            const data = {
                isSuccess: result.affectedRows,
                message: result.message
            }
            response(200, data, "Berhasil Mengupdate Data Mahasiswa", res)
        } else {
            response(500, "Error", "Data Mahasiswa Tidak Ditemukan", res)
        }
    })
})

app.delete("/mahasiswa", (req,res) => {
    const nim = req.body.nim
    
    const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`

    db.query(sql, (err, result) => {
        if(err) response(500, "invalid", "error", res)

        if(result.affectedRows > 0){
            response(200, "Success", "Berhasil Menghapus Data", res)
        } else {
            response(500, "Error", "Data Mahasiswa Tidak Ditemukan", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
