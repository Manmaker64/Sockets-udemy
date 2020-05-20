import { Socket } from 'socket.io';
import socketIO from 'socket.io';

// Cliente desconectado
export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente ========> \x1b[31m%s\x1b[0m', 'Desconectado')
    });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido => \x1b[32m%s\x1b[0m', payload );
        io.emit('mensaje-nuevo', payload );
    });
}