import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}

// Cliente desconectado
export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente ========> \x1b[31m%s\x1b[0m', 'Desconectado');
        usuariosConectados.borrarUsuario( cliente.id );
    });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido => \x1b[32m%s\x1b[0m', payload );
        io.emit('mensaje-nuevo', payload );
    });
}

// Configurar usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
        // io.emit('configurar-usuario', payload );
    });
}