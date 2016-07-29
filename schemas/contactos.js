var mongoose = require('mongoose');

var   Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var contactosSchema = new Schema({
   id_Obj:ObjectId,
   id:Number,
   Nombres: String,
   Telefono : String,
   Correo : String,
   Mensaje : String,
   Fecha : String
});

module.exports = mongoose.model('contactos', contactosSchema);