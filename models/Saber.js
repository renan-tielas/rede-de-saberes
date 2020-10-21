const mongoose= require('mongoose');
const Schema = mongoose.Schema //só pra abreviar

const SaberSchema = new Schema({
    usuario: { //conectar a um usuario
        type: Schema.Types.ObjectId,
        ref:'usuarios' //referenciar o Mdol usuarios (?)
    }, //assim voce ve quem postou, avatar / só voce pode deletar seu post,
    texto:{
        type: String,
        required: true
    },
    nome:{ //do usuario 
        type:String
    },
    avatar: {
        type: String
    },
    curtidas: [
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref:'usuarios'
        }
    }// é um array de usuarios que curtiram o saber
    ],
    comentarios: [
        {
            usuario: {
                type: Schema.Types.ObjectId,
                ref:'usuarios'
            },  
            texto: {
                type: String,
                required: true
            }, 
            nome: {
                type: String
            }, 
            avatar: {
                type: String
            }, 
            data: {
                type: Date,
                default: Date.now
            }     
        }
        ],
        data: {
            type: Date,
            default: Date.now
        }   
});



module.exports = Saber = mongoose.model('saber',SaberSchema)