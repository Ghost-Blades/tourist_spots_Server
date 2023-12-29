import express, { json } from "express";
import sqlite3 from "sqlite3";
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

const router = express.Router();
const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database('myDatabase.db');

export default router;


router.get("/", (req, res) => {

    db.serialize(() => {

        db.all(`SELECT * FROM Reviews `, (err, row) => {
            res.json(row);
        });

    });

})

router.get("/:Id", (req, res) => {

    const User_Id = req.params.Id

    db.serialize(() => {

        db.all(`SELECT * FROM Reviews WHERE User = ${User_Id}`, (err, row) => {
            res.json(row);
        });

    });

})