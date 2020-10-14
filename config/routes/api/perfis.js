const express = require('express')
const router = express.Router();


// @route GET   api/perfis
// @desc        testar a rota
// @access      Public - não precisa de token pra acessar a rota - por ex pra adicionar um perfil.


router.get('/', (req,res) => res.send('Rota dos perfis'));

module.exports = router;