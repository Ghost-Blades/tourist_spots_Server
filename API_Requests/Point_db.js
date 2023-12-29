import express, { json } from "express";
import sqlite3 from "sqlite3";

const router = express.Router();
const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database('myDatabase.db');

export default router;

router.get('/', (req, res) => {

    db.serialize(() => {

        db.all('SELECT * FROM Point', (err, row) => {
            res.json(row);
        });

    });

});


router.get("/category", (req, res) => {

    db.serialize(() => {

        db.all('SELECT * FROM Categories_Point', (err, row) => {
            res.json(row);
        });

    });


});

router.get("/type", (req, res) => {

    db.serialize(() => {

        db.all('SELECT * FROM Type_Point', (err, row) => {
            res.json(row);
        });

    });


})