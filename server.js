const express = require('express');

const app = express();


app.get('/', (req,res) => res.send('API funcionando'));
// criar um endpoint para testar: um get request que vai enviar a string para o browser

const PORT = process.env.PORT || 5000;
// procura uma variável PORT pra ser a porta (que vai vir mais tarde do heroku), se não houver faz o default 5000


app.listen(PORT, () => console.log(`Server iniciou na porta ${PORT}`));
// depois da virgula o callback, função chamada quando conecta