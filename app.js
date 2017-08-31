let express=require('express');
let app=express();
let getdata=require('./routes/getdata');
let add=require('./routes/add');
let bodyParser=require('body-parser');
let mongoose = require('mongoose');
let updates=require('./routes/updates');
let deletes=require('./routes/deletes');

app.get('/',function(req,res){
	res.send('Hello');
});

mongoose.connect('mongodb://localhost:27017/kuldeep');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use('/getdata',getdata);			//to fetch data from dtatabase
app.use('/add',add);							//to add new data into collection
app.use('/deletes',deletes);			//to delete data from database
app.use('/updates',updates);			// to update the data

app.listen(3000);
module.exports=app;