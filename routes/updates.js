let express = require('express');
let router = express.Router();
let Details =require('../model/Schema');

router.put('/:id',(req,res)=>{
// to update data using id and update method
	Details.update({
		age:req.params.id
	},
	{$set:{name:req.body.name}},
	{upsert:true},
	(err,result)=>{
		if(err){
			console.log('Error in updating');
		}
		else{
			console.log(result);
			res.json(result);
			//res.status(204);
		}
	}
	);
});

module.exports = router