var express = require('express');
var router = express.Router();
 var pool=require('./pool'); 

 router.post('/check_admin_login',function(req,res,next){
    console.log(req.body);
   
pool.query('select * from administrator where emailid=? and password=?',[req.body.emailaddress,req.body.password],function(error,result){

  console.log(result);

if(error){
    return res.status(500).json({result:false})
}
else{
  if(result.length==1){
    return res.status(200).json({result:true})
  }
   else{
    return res.status(200).json({result:false})
   }
}

});
});

module.exports=router;