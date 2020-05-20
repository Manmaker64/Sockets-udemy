import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server(0);

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors({ origin: true, credentials: true }) );

// Rutas de servicios
server.app.use( '/', router );

server.start( () => {
    console.log(`Express Server => \x1b[33m Puerto ${ server.port }: \x1b[32m%s\x1b[0m`, 'Online');
});