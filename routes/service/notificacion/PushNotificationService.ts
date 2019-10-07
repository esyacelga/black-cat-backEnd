import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {EnvioNotificacion} from "./classes/EnvioNotificacion";
import {obtenerUsuariosNotificacion} from "../persona/TipoUsuarioPersonaService";

const util = new CommonsMethods();
export const enviarNotificacion = async (req: Request, res: Response) => {
    const data = {
        tittuloNotificacion: req.body.tittuloNotificacion,
        detalleNotificacion: req.body.detalleNotificacion,
        key: req.body.key,
        valor: req.body.valor,
        grupoUsuarios: req.body.grupoUsuarios
    };
    const lstPlayer: string[] = await obtenerUsuariosNotificacion(data.grupoUsuarios);
    const notificacion = new EnvioNotificacion();
    console.log('Enviando notificacion...');
    console.log(lstPlayer);
    notificacion.enviar(data.tittuloNotificacion, data.detalleNotificacion, lstPlayer, data.key, data.valor, '');
    res = util.responceBuscar(req, res, null, data);
}