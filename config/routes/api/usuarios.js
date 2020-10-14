const express = require('express')
const router = express.Router();
const { check, validationResult } = require ('express-validator')
//importar o modelo de usuario

const gravatar = require('gravatar');
const Usuario = require('../../../models/Usuario');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const config = require('config');

// @route POST  api/usuarios
// @desc        registrar usuario
// @access      Public - não precisa de token pra acessar a rota - por ex pra adicionar um perfil.


router.post('/',[
    check('nome', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Favor incluir um email válido').isEmail(),
    check('senha','Favor entrar com uma senha de 6 ou mais caracteres').isLength({min: 6}),

], 
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }


const {nome, email, senha} = req.body;

try{
    //Ver se o usuário existe

    let usuario = await Usuario.findOne( {email:email});

    if (usuario) {
        return res.status(400).json({errors: [{msg: 'Usuario já existe'}]});
    }

    //Pegar o gravatar do usuario , baseado no email

    const avatar = gravatar.url(email, {
        s:'200',
        r:'pg',
        d:'mm'

    })

    usuario = new Usuario({
        nome,
        email,
        avatar,
        senha
    })

    // Encriptar a senha  

    const salt = await bcrypt.genSalt(10);

    usuario.senha = await bcrypt.hash(senha,salt);

    await usuario.save();

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