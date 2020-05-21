import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: 'GET - Listo'
    });
});

// Servicio para eviar mensajes a todos los usuarios
router.post('/mensajes', ( req: Request, res: Response ) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = { cuerpo, de };
    const server = Server.instance;

    server.io.emit( 'mensaje-nuevo', payload );

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

// Servicio para enviar mensajes privados a un único usuario (ID)
router.post('/mensajes/:id', ( req: Request, res: Response ) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = { cuerpo, de };
    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {
    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[] ) => {
        if ( err ) {
            return res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                clientes
            });
        }
    });
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => {
    
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
});

export default router;