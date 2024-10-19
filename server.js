const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
require('./.config/database');
dotenv.config();
const userRoutes = require('./routes/user.route');



const app = express()
const PORT = process.env.PORT || 4012;


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// point de sorti de la table user
app.use('/user', userRoutes);




// Lancement du server 
app.listen(PORT,'0.0.0.0',() => console.log(`listening in port ${PORT}`));

















