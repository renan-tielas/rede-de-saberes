
const express = require('express')
const router = express.Router();
const autenticacao = require('../../../middleware/autenticacao');
const {check, validationResult} = require('express-validator')

const Usuario = require('../../../models/Usuario')
const Saber = require('../../../models/Saber')
const Perfil = require('../../../models/Perfil')

// @route POST   api/posts
// @desc        Criar saber
// @access      Privado

router.post('/', [autenticacao,[
    check('texto','texto é necessário').not().isEmpty()
]], async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array()});
    }

    try {
        
        const usuario = await Usuario.findById(req.usuario.id).select('-senha'); //acha o usuário e não pega a senha


        const novoSaber = new Saber ({
            texto: req.body.texto,
            nome: usuario.nome,
            avatar: usuario.avatar,
            usuario: req.usuario.id
        });

        const saber = await novoSaber.save();

        res.json(saber);


    } catch (err) {
       console.error(err.message);
       res.status(500).send('Erro no servidor - POST Saber')
    }

    
}

);


// @route       GET   api/posts
// @desc        Pegar todos os saberes
// @access      Privado   / ou publico se quisesse


router.get('/', autenticacao, async (req,res) =>{

    try {
        const saberes = await Saber.find().sort({date: -1});
        res.json(saberes);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor GET Saberes')
        
    }
})



// @route       GET   api/posts/:id
// @desc        Pegar saber por id
// @access      Privado   / ou publico se quisesse


router.get('/:id', autenticacao, async (req,res) =>{

    try {
        const saber = await Saber.findById(req.params.id);

        if(!saber){
            return res.status(404).send('Saber não encontrado');
        }

        res.json(saber);
        
    } catch (err) {
        console.error(err.message);
        if(err.kind==='ObjectId'){
            return res.status(404).send('Saber não encontrado');
        }
        res.status(500).send('Erro no servidor GET Saberes')
        
    }
})



// @route       DELETE   api/posts
// @desc        Deletar Saber
// @access      Privado 


router.delete('/:id', autenticacao, async (req,res) =>{

    try {
        const saber = await Saber.findById(req.params.id);

        if(!saber){
            return res.status(404).send('Saber não encontradoooo');
        }

        // Checar se usuario é o dono do post
        if(saber.usuario.toString() !== req.usuario.id){
            return res.status(401).json({msg:'Usuário não autorizado'});
        }
        await saber.remove();

        res.json({msg:'Saber removido'});
        
    } catch (err) {
        console.error(err.message);
        if(err.kind==='ObjectId'){
            return res.status(404).send('Saber não encontrado');
        }
        res.status(500).send('Erro no servidor GET Saberes')
        
    }
})




// @route       PUT   api/posts/curtir/:id
// @desc        Curtir um saber
// @access      Privado 

router.put('/curtir/:id', autenticacao, async (req,res) =>{


    try {
        const saber = await Saber.findById(req.params.id);

        //checar se o post ja foi curtido
        if(saber.curtidas.filter( curtida => curtida.usuario.toString() === req.usuario.id).length>0){
            return res.status(400).json({ msg: 'Saber já foi curtido'});
        }

        saber.curtidas.unshift({ usuario: req.usuario.id});
        
        await saber.save();
        res.json(saber.curtidas);

    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Erro no servidor PUT Curtidas')
    }
})




// @route       PUT   api/posts/curtir/:id
// @desc        Descurtir um saber
// @access      Privado 

router.put('/descurtir/:id', autenticacao, async (req,res) =>{


    try {
        const saber = await Saber.findById(req.params.id);

        //checar se o post ja foi curtido
        if(saber.curtidas.filter( curtida => curtida.usuario.toString() === req.usuario.id).length===0){
            return res.status(400).json({ msg: 'Saber ainda não foi curtido'});
        }

        //Pegar o indice para remove
        const indiceRemove= saber.curtidas.map ( curtida => curtida.usuario.toString().indexOf(req.usuario.id));
        //tirar a curtida do array
        saber.curtidas.splice(indiceRemove, 1);

        await saber.save();
        res.json(saber.curtidas);

    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Erro no servidor PUT Curtidas')
    }
})





// @route POST   api/posts/comentarios/:id_post
// @desc        Adicionar comentário a um post
// @access      Privado

router.post('/comentarios/:id', [autenticacao,[
    check('texto','texto é necessário').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-senha'); //acha o usuário e não pega a senha

        const saber = await Saber.findById(req.params.id);


        const novoComentario = {
            texto: req.body.texto,
            nome: usuario.nome,
            avatar: usuario.avatar,
            usuario: req.usuario.id
        };

        saber.comentarios.unshift(novoComentario);

        saber.save();


        res.json(saber.comentarios);


    } catch (err) {
       console.error(err.message);
       res.status(500).send('Erro no servidor - POST Comentario')
    }

    
}

);




// @route DELETE   api/posts/comentarios/:id/:id_comentario
// @desc        Deletar comentário
// @access      Privado


router.delete('/comentarios/:id/:id_comentario', autenticacao, async (req,res) => {
    try {
        const saber = await Saber.findById(req.params.id);

        //Tirar o comentario
        const comentario = saber.comentarios.find(comentario => comentario.id === req.params.id_comentario);

        // Comentario existe?
        if(!comentario) {
            return res.status(404).json({msg : 'Comentário não existe'});
        }

        //Checar usuário é o dono?

        if(comentario.usuario.toString() !== req.usuario.id){
            return res.status(401).json({msg:'Usuario não autorizado'})
        }

         //Pegar o indice para remove
         const indiceRemove= saber.comentarios.map ( comentario => comentario.usuario.toString().indexOf(req.usuario.id));
         //tirar a curtida do array
         saber.comentarios.splice(indiceRemove, 1);
 
         await saber.save();
         res.json(saber.comentarios);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor - DELETE Comentario')
        
    }

});



module.exports = router;