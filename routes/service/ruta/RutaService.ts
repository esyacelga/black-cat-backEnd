import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {RutaModeloPersistencia} from "../../../models/ruta/RutaModeloPersistencia";
import {RutaDto, RutaIntegranteDto} from "../../../classes/ruta/RutaDto";
import {isUndefined} from "util";
import {RutaIntegranteModeloPersistencia} from "../../../models/ruta/RutaIntegranteModeloPersistencia";

const util = new CommonsMethods();


export const ObtenerTodos = (req: Request, res: Response) => {
    RutaModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}


export const Registrar = async (req: Request, res: Response) => {
    let rutaDetalle: RutaIntegranteDto;
    const data: RutaDto = req.body as RutaDto;
    let objRuta: RutaDto = (await RutaModeloPersistencia.findOne().where('disponibilidad').equals(data.disponibilidad._id)) as unknown as RutaDto;
    console.log(data);
    if (isUndefined(objRuta)) {
        objRuta = (await RutaModeloPersistencia.create(data)) as unknown as RutaDto;
    }

    if (data && data.lstIntegrantes && data.lstIntegrantes.length > 0) {
        let objRutaDetalle: RutaIntegranteDto = data.lstIntegrantes[0];
        objRutaDetalle.rutaModeloPersistencia = data._id;
        console.log(objRutaDetalle);
        rutaDetalle = (await (RutaIntegranteModeloPersistencia.create(objRutaDetalle))) as unknown as RutaIntegranteDto;
        objRuta.lstIntegrantes.push(rutaDetalle);
    }
    res = util.responceCrear(req, res, null, objRuta);
    return res;
}

export const Actualizar = (req: Request, res: Response) => {
    const data: RutaDto = req.body as RutaDto;
    RutaModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};

