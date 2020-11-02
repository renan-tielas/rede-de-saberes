const express = require('express')
const router = express.Router();
const autenticacao = require('../../../middleware/autenticacao');
const request = require('request')
const config = require('config')


const { check, validationResult} = require('express-validator')


const Perfil = require('../../../models/Perfil');

const Usuario = require('../../../models/Usuario');

// const Saber = require('../../../models/Saber');

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
    check('status', 'É necessário escolher entre: Pessoa, Grupo ou Rede').not().isEmpty(),
    check('habilidades','Habilidades são necessárias').not().isEmpty()
]], async(req,res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {
        grupo,
        rede,
        site,
        local,
        biografia,
        status,
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
if(rede) perfilCampos.rede = rede;
if(site) perfilCampos.site = site;
if(local) perfilCampos.local = local;
if(biografia) perfilCampos.biografia = biografia;
if(status) perfilCampos.status = status;
if(githubusername) perfilCampos.githubusername = githubusername;

if(habilidades){
    perfilCampos.habilidades = habilidades.toString().split(',').map(habilidades => habilidades.trim())
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

 }catch(err){

     console.error(err.message);
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
        // remove todas as postagens do usuario

        // await Saber.deleteMany({usuario : req.usuario.id})


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

// @route       PUT api/perfis/experiencia
// @desc        Adicionar experincia do perfil
// @access      Private

router.put('/experiencia', [autenticacao, [
    check('titulo', 'Título é necessário').not().isEmpty(),
    check('local', 'Local é necessário').not().isEmpty(),
    check('status', 'Pessoa, Grupo ou Rede é necessário').not().isEmpty(),
    check('desde', 'Data de início é necessária').not().isEmpty(),
]], async (req,res) => {

const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
}

    const {
        titulo,
        tema,
        status,
        grupo,
        rede,
        local,
        desde,
        até,
        atual,
        descrição
    }= req.body;

    const novaXP = { // cria um objeto com os dados do usuario
        titulo,
        tema,
        status,
        grupo,
        rede,
        local,
        desde,
        até,
        atual,
        descrição
    }


    try {

        const perfil = await Perfil.findOne({ usuario : req.usuario.id});

        perfil.experiencia.unshift(novaXP);
        await perfil.save();

        res.json(perfil);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor - perfis PUT experienca');

    }


});












// @route       DELETE api/perfis/experiencia/:exp_id
// @desc        Deletar experiencia do perfil
// @access      Private

router.delete('/experiencia/:exp_id', autenticacao, async (req,res) => {


    try {

        const perfil = await Perfil.findOne({ usuario : req.usuario.id});
        
        //Pegar o índice de remoção
        indiceRemocao = perfil.experiencia
        .map(xp => xp.id)   //mapeia atraves das experiencias e pega os id
        .indexOf(req.params.exp_id); // relaciona com o exp_id entrado na url request e pega seu indice
        
        
        perfil.experiencia.splice(indiceRemocao,1);  // corta fora 1 item a partir do indice
        
        await perfil.save();

        res.json(perfil);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor - perfis DELETE experienca');

    }


});










// @route       PUT api/perfis/saberes
// @desc        Adicionar saberes do perfil
// @access      Private

router.put('/saberes', [autenticacao, [
    check('titulos', 'Titulos são necessários').not().isEmpty(),
    check('escolas', 'Escolas são necessário').not().isEmpty(),
    check('aprofundamento', 'Nível de aprofundamento é necessário').not().isEmpty(),
    check('temas', 'Tema é necessário').not().isEmpty(),
    check('desde', 'Data de início é necessária').not().isEmpty(),
]], async (req,res) => {

const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
}

    const {
        titulos,
        escolas,
        aprofundamento,
        temas,
        desde,
        até,
        atual,
        descrição
    }= req.body;

    const novoSABER = { // cria um objeto com os dados do usuario
        titulos,
        escolas,
        aprofundamento,
        temas,
        desde,
        até,
        atual,
        descrição
    }


    try {

        const perfil = await Perfil.findOne({ usuario : req.usuario.id});

        perfil.saberes.unshift(novoSABER);
        await perfil.save();

        res.json(perfil);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor - perfis PUT saber');

    }


});



// @route       DELETE api/perfis/saberes/:saber_id
// @desc        Deletar saber do perfil
// @access      Private

router.delete('/saberes/:exp_id', autenticacao, async (req,res) => {
// Problemihna : falta checar se o id é real, não está acontecendo nada caso não seja, acho;

    try {

        const perfil = await Perfil.findOne({ usuario : req.usuario.id});
        
        //Pegar o índice de remoção
        indiceRemocao = perfil.saberes
        .map(xp => xp.id)   //mapeia atraves das saberess e pega os id
        .indexOf(req.params.saber_id); // relaciona com o exp_id entrado na url request e pega seu indice
        
        
        perfil.saberes.splice(indiceRemocao,1);  // corta fora 1 item a partir do indice
        
        await perfil.save();

        res.json(perfil);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor - perfis DELETE experienca');

    }





// @route       GET api/perfis/github/:nomeusuario
// @desc        Pegar repositorios do Github
// @access      Publico
// NÃO ESTA FUNCIONANDO
router.get('/github/:username', (req,res) =>{

    try {
        
        const opcoes ={
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{ 'user-agent':'node.js'}
        };

        request(opcoes, (error, response, body)=>{
            if(error) console.error(error);
            
            if (response.statusCode !== 200){
                res.status(404).json({msg:'Perfil github não encontrado'})
            }
            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erro no servidor - GET github")
    }





})


});












module.exports = router;
