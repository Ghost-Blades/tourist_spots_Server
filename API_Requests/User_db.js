import express, { json } from "express";
import sqlite3 from "sqlite3";

import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

const router = express.Router();
const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database('myDatabase.db');

export default router;

router.get("/", (req, res) => {

    db.serialize(() => {

        db.all(`SELECT * FROM User`, (err, row) => {
            res.json(row);
        });

    });

});

router.put("/", async (req, res) => {

    const User_name = req.body["User_name"];
    const Login = req.body["Login"];
    const Password = req.body["Password"];

    try {
        const hashPassword = await bcrypt.hash(Password, 8);
        //console.log(hashPassword);
        db.serialize(() => {
            db.run(`INSERT INTO User (User_KEY,User_name, Login, Password) VALUES (?,?,?,?)`, [uuidv1(), User_name, Login, hashPassword], (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Error inserting data' });
                }
                console.log(`Row inserted with ID`);
                res.json({ message: 'Data inserted successfully' });
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing password' });
    }
});

router.delete("/:id", (req, res) => {

    const id = req.params.id;

    db.serialize(() => {
        db.run(`DELETE FROM User WHERE User_KEY = ?`, [id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Error deleting data' });
            }

            //if (this.changes === 0) {
            //    return res.status(404).json({ error: 'No matching record found' });
            //}

            console.log(`Row deleted with ID: ${id}`);
            res.json({ message: 'Data deleted successfully' });
        });
    })

});