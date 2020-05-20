import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor( port: number ) {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this(0) );
    }

    private escucharSockets() {
        console.log('Sockets ========> \x1b[32m%s\x1b[0m', 'Escuchando conexiones...');
        this.io.on('connection', cliente => {
            console.log('Cliente ========> \x1b[32m%s\x1b[0m', 'Conectado');

            // Mensajes
            socket.mensaje( cliente, this.io );

            // Desconectar
            socket.desconectar( cliente );
        });
    }

    start( callback: () => void ) {
        this.httpServer.listen( this.port, callback );
    }
}