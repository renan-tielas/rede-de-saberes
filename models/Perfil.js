const mongoose =require('mongoose');

const PerfilSchema = new mongoose.Schema({ //nao esquecer new!!
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'           // IMPORTANTE ser "ref"!! Não sei exatamente o que faz, mas acho que é herança, ou schemas relacionados que pode acessar
    },

    grupo: {
        type:String
    },

    site: {
        type: String
    },

    local: {
        type: String
    },

    ocupação: {
        type: String
    },

    habilidades:{
        type: [String],  //array de habilidades
        required: true
    },

    biografia:{
        type:String
    },

    githubusername:{
        type:String
    },

    experiencia: [
        {
            titulo: {
                type:String,
                required: true
            },
            
            companhia: {
                type:String,
                required: true
            },

            local: {
                type:String,
                required: true
            },

            desde: {
                type:Date,
                required: true
            },

            até: {
                type:Date
            },

            atual: {
                type:Boolean,
                default: false
            },

            descrição: {
                type: String
            },

        }

    ],

    
    saberes: [
        {

            escolas: {
                type: [String],
                required: true
            },
            
            aprofundamento: {
                type:[String],
                required: true
            },

            temas: {
                type:[String],
                required: true
            },

            desde: {
                type:Date,
                required: true
            },

            até: {
                type:Date
            },

            atual: {
                type:Boolean,
                default: false
            },

            descrição: {
                type: String
            },
        }
    ],


    links: {

        youtube: {
            type: String
        },

        facebook: {
            type: String
        },
        gmail: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    data: {
        type : Date,
        default:Date.now
    }
});



module.exports = Perfil = mongoose.model('perfil',PerfilSchema);

