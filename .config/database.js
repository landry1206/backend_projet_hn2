const mongoose = require("mongoose");






mongoose.connect("mongodb://localhost:27017/hn")
.then(() => { console.log('Connected to mongoDB')})
.catch(e => {console.log('Error while DB connecting');
	          console.log(e); 
	});