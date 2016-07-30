var mongoose = require('mongoose');

var   Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var usuariosappSchema = new Schema({
   id_Obj:ObjectId,
   id: Number,
   Foto:String,
   Nombres: String,
   Correo: String,
   Fecha: String,
   Notificaciones: Boolean,
   Usuario: String,
   Pass: String,
   Token_Device: String,
   Activo: Boolean,
   NumSesiones: Number,
   Rol: String,
   Domicilios: Boolean,
   Abierto: Boolean,
   Ubicacion:Object,
   Favoritos: Array,
   Hora: {ini:String,fin:String}
});

module.exports = mongoose.model('usuariosapp', usuariosappSchema,'usuariosapp');
