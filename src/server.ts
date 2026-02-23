import express, { Router } from 'express';
import helmet from 'helmet';
import router from './routes/index.js';


const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded( { extended: true } ));

server.use('/', router);

server.listen(3000, () => {
    server.response
       console.log("Servidor funcionando, http://localhost:3000/");
})



