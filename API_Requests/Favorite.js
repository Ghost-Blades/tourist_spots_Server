import express, { json } from "express";
import sqlite3 from "sqlite3";
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

const router = express.Router();
const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database('myDatabase.db');

export default router;

router.get('/', (req, res) => {

    db.serialize(() => {

        db.all(`SELECT * FROM Favorites_Point `, (err, row) => {
            res.json(row);
        });

    });

})

router.get('/:id', (req, res) => {

    const User_ID = req.params.id;

    db.serialize(() => {

        db.all(`SELECT * FROM Favorites_Point WHERE User = '` + User_ID + `'`, (err, row) => {
            res.json(row);
        });

    });

})

router.put('/', (req, res) => {

    const User_ID = req.body.User_ID;
    const Point_ID = req.body.Point_ID;

    const Data_key = uuidv4()

    db.run(`INSERT INTO Favorites_Point (Data_Key,Point,User) VALUES (?,?,?)`, [Data_key, Point_ID, User_ID], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error inserting data' });
        }

        console.log(`Row inserted with ID`);
        res.json({ message: 'Data inserted successfully' });
    })

})

router.delete('/:data_key', (req, res) => {

    const data = JSON.parse(req.params.data_key)
    const User_ID = data.User_ID;
    const Point_ID = data.Point_ID;

    db.run(`DELETE FROM Favorites_Point WHERE Point = ? and User = ?`, [Point_ID, User_ID], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error deleted data' });
        }

        res.json({ message: 'Data delete successfully' });
    })

})