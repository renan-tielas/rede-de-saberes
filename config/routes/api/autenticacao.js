const express = require('express')
const router = express.Router();
const autenticacao = require('../../../middleware/autenticacao');
const Usuario = require('../../../models/Usuario');

const { check, validationResult } = require ('express-validator')
const config = require('config');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// @route GET   api/autenticacao
// @desc        verificar usuario
// @access      Public - não precisa de token pra acessar a rota - por ex pra adicionar um perfil.


router.get('/',autenticacao,async (req,res) =>{

    try{
        const usuario = await Usuario.findById(req.usuario.id).select('-senha');
      
        res.json(usuario)

    } catch(err){
        console.error(err.message);
        res.status(500).send('Erro do Servidor');
    }

}
);



// @route POST  api/autenticacao
// @desc        Autenticar usuario e pegar token
// @access      Public - não precisa de token pra acessar a rota - por ex pra adicionar um perfil.


router.post('/',[
    check('email', 'Favor incluir um email válido').isEmail(),
    check('senha','Senha necessária').exists(),

], 
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }


const {email, senha} = req.body;

try{
    //Ver se o usuário existe
    let usuario = await Usuario.findOne( {email:email});
    if (!usuario) {
        return res.status(400).json({errors: [{msg: 'Credenciais inválidas'}]});
    }

const deuMatch = await bcrypt.compare(senha,usuario.senha);
if (!deuMatch) {
    return res.status(400).json({errors:[{msg:'Credenciais Inválidas'}]});
}


    // Return jsonwebtoken, para usuario ser logado logo após registrar
    
    const payload = {
        usuario: {
            id: usuario.id
        }
    }
  
    JWT.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:36000}, 
        (err,token) =>{
        if(err) throw err;
        res.json({ token });
        }
    );
} catch(err){
    console.error(err.message);
    res.status(500).send('Erro no servidor')

}


}
);





module.exports = router;