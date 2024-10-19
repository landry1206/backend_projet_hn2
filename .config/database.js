const mongoose = require("mongoose");






mongoose.connect("mongodb+srv://HN2:hn2028@hn2.nf6qe.mongodb.net/")
.then(() => { console.log('Connected to mongoDB')})
.catch(e => {console.log('Error while DB connecting');
	          console.log(e); 
	});