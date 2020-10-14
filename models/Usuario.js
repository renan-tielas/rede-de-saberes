const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({

nome:{
    type:String,
    required:true},

email: {
    type: String,
    required: true,
    unique:true    //Somente um usuário por email
},
senha: {type: String,
    required: true,},

avatar: {type: String},

data: {
    type: Date,
    default:Date.now
}
}
);

module.exports = Usuario = mongoose.model('usuario', UsuarioSchema);