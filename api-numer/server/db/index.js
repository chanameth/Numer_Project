const mongoose = require('mongoose')
const dbRoute = 'mongodb+srv://neng0702:%3089%374060%319@cluster0-nihyf.azure.mongodb.net/Numerical?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
mongoose
    .connect(dbRoute, { useNewUrlParser: true , useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
            .once('open' , () => console.log('connect,really?'))
            .on('error', () => console.log('Error cant conect'))
db.once('open', () => console.log('connected to the database'));
module.exports = db