import Express, { json } from "express";
import os from 'os';
import cluster from "cluster";

import UserRoute from './API_Requests/User_db.js';
import PointRoute from './API_Requests/Point_db.js';
import Favorite from './API_Requests/Favorite.js';
import Review from './API_Requests/Review.js'

import dotenv from "dotenv";
dotenv.config();

import { fileURLToPath } from "url";
import path from 'path';
import { LinuxComand, getIPv4Address } from "./Requests.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const PORT = process.env.PORT;
const server = Express();

server.use(Express.json());

//Подключение API запросов
server.use('/user', UserRoute);
server.use('/point', PointRoute);
server.use("/favorite", Favorite);
server.use("/review", Review);

//Работа с картинками

server.use('/images', Express.static('images'));

// Роут для получения изображения
server.get('/image/:imageName', (req, res) => {
    const { imageName } = req.params;
    res.sendFile(`${__dirname}/images/${imageName}`);
});

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/Index.html');
});


server.listen(PORT, () => {
    console.log(
        "IPv4:" + getIPv4Address() +
        "\nPORT:" + process.env.PORT +
        "\nPID:" + process.pid +
        "\nOS:" + os.platform
    );

    //Команды для Linux
    LinuxComand('free -h');
    LinuxComand('pwd');
})
