const mongoose = require('mongoose'); // usado para conectar
const config = require('config'); // pra pegar a string do mongodbURI
const mongodb= config.get('mongoURI'); // pegar a string


   
const connectDB = async () => {

try{

    await mongoose.connect(mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology :true,
        useCreateIndex: true
    }); // nos da uma promessa

    console.log('MongoDb conectou ...');

}

catch(err){
console.error(err.message);
//sair do processo caso falhe
process.exit(1);

}
}

module.exports = connectDB;