const JWT = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {
// Pegar o token do header do req
const token = req.header('x-auth-token');

// Checar se não token

if(!token){
    return res.status(401).json({msg:'Sem token, sem autorização'})
}

// Verificar o token

try {
const decodificado = JWT.verify(token, config.get('jwtSecret'));

req.usuario = decodificado.usuario ;

next();} catch (err){
res.status(401).json({msg: 'Token não é válido'});
}

}