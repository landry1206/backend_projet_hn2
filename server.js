const express = require("express");
const cors = require('cors')
const bonjour = require('bonjour')()
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
require('./.config/database');
dotenv.config();
const userRoutes = require('./routes/user.route');
const eventRoutes = require('./routes/event.route')



const app = express()
const PORT = process.env.PORT || 4012;


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// point de sorti de la table user
app.use('/user', userRoutes);
// point de sorti de la table post
app.use('/event', eventRoutes)



// Lancement du server 
app.listen(PORT,'0.0.0.0',() => console.log(`listening in port ${PORT}`));

// publier le service via bonjour


// Enregistrer un service HTTP
bonjour.publish({ name: 'hn2_backend', type: 'http', port: 4012 });

console.log('Service Bonjour publié !');


















