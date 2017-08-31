let express=require('express');
let router = express.Router();
let Details=require('../model/Schema');

router.get('/',(req,res)=>{
	Details.find({},(err,data) => {
		res.json(data);
	})
})
module.exports = router;