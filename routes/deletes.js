let express =require('express');
let router = express.Router();
let Details = require('../model/Schema');
// to dalete data using remove based on id
router.delete('/:id',(req,res)=>{
	Details.remove({
		age:req.params.id
	},(err,result)=>{
		if(err)
			console.log('Error in deleting');
		else{
			res.json(result);
		}
		
	})
});
module.exports = router;


