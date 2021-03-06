import {model, Schema} from 'mongoose';

const notificacionModel = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo notificacion es necesario']
    },
    mensajeTitulo: {
        type: String,
        required: [true, 'El mensaje del titulo necesario']
    },
    key: {
        type: String
    },
    keyPayload: {
        type: String
    },
    tipoUsuario: {required: [true, 'El segmentdo de usuarios a los que la notificación se enviará es necesaria especificarla'], type: Schema.Types.ObjectId, ref: 'TipoUsuario'},
    estado: {
        type: Number,
        required: [true, 'El titulo notificacion es necesario']
    },
    created: {
        type: Date
    },
});


export const NotificacionModel = model('Notificacion', notificacionModel);
