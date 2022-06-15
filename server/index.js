const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const post = require("./routes/api/posts");
const app = express();

// MiddleWare 
app.use(bodyParser.json());
app.use(cors());
app.use("/api/posts", post);

/*####################################################
 ************  Handling production ************/

// if the website is deployed we'll set the route
// to public folder which is used for production  
if(process.env.NODE_ENV === 'production'){
    // static folder
    app.use(express.static(__dirname+'/public'));

    // Handling single page application
    app.get(/.*/, (req,res)=>res.sendFile(__dirname+'/public/index.html'));
}
/*#################################################### */ 

// The website will either launch on localhost:5000 or
//  any webhosting platform like heroku if deployed to  
const port = process.env.PORT || 5000;
app.listen(port, ()=> 
console.log(`Server started on port ${port}`));

