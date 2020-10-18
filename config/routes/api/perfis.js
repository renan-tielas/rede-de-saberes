const express = require('express')
const router = express.Router();
const autenticacao = require('../../../middleware/autenticacao');

const { check, validationResult} = require('express-validator')


const Perfil = require('../../../models/Perfil');

const Usuario = require('../../../models/Usuario');



// @route       GET api/perfis/eu
// @desc        pegar perfil do usuario atual
// @access      Private


router.get('/eu',autenticacao, async(req,res) => {

    try {
        const perfil = await Perfil.findOne({usuario:req.usuario.id}).populate('usuario'['nome','avatar']);
     //é o id do perfil, primeiro parametro so Perfil Schema
     //populado com as variáveis do usuario: nome e avatar

        if(!perfil) {
            return res.status(400).json({ msg: 'Não tem perfil para esse usuário'});           
    
    }
    return res.json(perfil); } catch(err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor - perfiis.js');
    }

});






// @route       POST api/perfis/eu
// @desc        Criar ou atualizar perfil do usuário
// @access      Private


router.post('/',[autenticacao, [
    check('ocupação', 'Ocupação é necessário').not().isEmpty(),
    check('habilidades','Habilidades são necessárias').not().isEmpty()
]], async(req,res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {
        grupo,
        site,
        local,
        biografia,
        ocupação,
        githubusername,
        habilidades,
        youtube,
        facebook,
        email,
        instagram
    }=req.body
//acima desestruturando o objeto de entrada nessas variaveis,
// para então construir o objeto perfil
const perfilCampos ={};
perfilCampos.usuario = req.usuario.id;
if(grupo) perfilCampos.grupo = grupo;
if(site) perfilCampos.site = site;
if(local) perfilCampos.local = local;
if(biografia) perfilCampos.biografia = biografia;
if(ocupação) perfilCampos.ocupação = ocupação;
if(githubusername) perfilCampos.githubusername = githubusername;
if(habilidades){
    perfilCampos.habilidades = habilidades.split(',').map(habilidades => habilidades.trim())
}// corta os espaços após as palavras, 
//para usar com entrada de arrays separada por virgula
console.log(perfilCampos.habilidades);




 // construir o objeto links
 perfilCampos.links ={};
 if(youtube) perfilCampos.links.youtube = youtube;
 if(facebook) perfilCampos.links.facebook = facebook;
 if(email) perfilCampos.links.email = email;
 if(instagram) perfilCampos.links.instagram = instagram;


 try{
    let perfil = await Perfil.findOne({usuario: req.usuario.id});

    if(perfil){
        //Update do perfil
        perfil = await Perfil.findOneAndUpdate(
            {usuario:req.usuario.id},
            {$set:perfilCampos},
            {new:true});
        
     return res.status(200).json(perfil);
        }


//Criar perfil

perfil=new Perfil(perfilCampos);
await perfil.save();
res.json(perfil);

 }catch{

     console.error(error.message);
     res.status(500).send('Erro servidor - perfis js')

};
});






// @route       GET api/perfis
// @desc        Pegar todos os perfis
// @access      Private

router.get('/', async (req,res) => {
    try {
        // const perfis = await Perfil.find().populate('usuario',['nome','avatar']);
        const perfis = await Perfil.find().populate('usuario', ['nome', 'avatar']);
        
        res.json(perfis);
    } catch (err) {
        console.error(err.message);
        res.send('Erro no servidor - perfis').status(500);
    }

})



// @route       GET api/perfis/usuario/:usuario_id
// @desc        Pegar perfil pelo ID do usuario
// @access      Publico

router.get('/usuario/:usuario_id', async (req,res) => {
    try {
        
        const perfil = await Perfil.findOne({usuario: req.params.usuario_id}).populate('usuario', ['nome', 'avatar']);
        
        if(!perfil){
            return res.status(400).json({ msg: 'Não tem perfil para esse usuário' })


        }

        res.json(perfil);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            res.send('Perfil não encontrado').status(400);
        }
        res.send('Erro no servidor - perfis').status(500);
    }

})



// @route       DELETE api/perfis
// @desc        Deletar perfil, usuário e posts
// @access      Private

router.delete('/',autenticacao,  async (req,res) => {
    try {
        // remove postagem  

        // remove perfil
        await Perfil.findOneAndRemove({usuario:req.usuario.id});


        // remove usuário
        await Usuario.findOneAndRemove({_id:req.usuario.id});

        res.json({msg : "Usuario deletado"});
    } catch (err) {
        console.error(err.message);
        res.send('Erro no servidor - perfis').status(500);
    }
});




module.exports = router;
