let express =require ('express');
let router = express.Router();
let Details = require('../model/Schema');

router.post('/',(req,res)=>{

	let user=new Details();
	user.name=req.body.name;
	user.age=req.body.age;
	user.save((err,result)=>{
		if(err)
			console.log('Error in saving');
		else{
			console.log(result);
			res.send(result);
		}
	})
	/*Details.insertMany({
		name : req.body.name,
		age : req.body.age
	},(err,result)=>{
		if(err)
			console.log('Error in saving');
		else{
			console.log(result);
			res.send(result);
		}
		});		*/
});
module.exports = router;