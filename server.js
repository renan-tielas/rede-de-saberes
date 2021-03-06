const express = require('express');
const connectDB = require('./config/mongodb')
const app = express();
const path = require('path')



// Conecta ao banco de dados

connectDB();


// Init Middleware

app.use(express.json({extended:false}));
//permite usar os dados em request.body

// app.get('/', (req,res) => res.send('API funcionando'));
// criar um endpoint para testar: um get request que vai enviar a string para o browser


// procura uma variável PORT pra ser a porta (que vai vir mais tarde do heroku), se não houver faz o default 5000


//definir as rotas
app.use('/api/usuarios', require('./config/routes/api/usuarios'))
app.use('/api/posts', require('./config/routes/api/posts'))
app.use('/api/autenticacao', require('./config/routes/api/autenticacao'))
app.use('/api/perfis', require('./config/routes/api/perfis'))

//Serve static assets in production

if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    });
}

const PORT = process.env.PORT || 5000;
//comando .use torna o primeiro argumento caminho do arquivo no segundo argumento


app.listen(PORT, () => console.log(`Server iniciou na porta ${PORT}`));
// depois da virgula o callback, função chamada quando conecta