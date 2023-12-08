var express = require('express');
var router = express.Router();
 var pool=require('./pool');
var upload=require('./multer');




router.post('/add_size', function (req, res, next) {

    console.log(req.body);
    pool.query('insert into size(categoryid,subcategoryid,productid,size) values(?,?,?,?)', [req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.size], function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({status:false})
        }
        else {
            res.status(200).json({ status:true })
        }
    });

});

router.get('/display_size', function (req, res, next) {

    console.log(req.body);
    pool.query('SELECT S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as cn,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=S.subcategoryid) as scn,(select P.productname from products P where P.productid=S.productid) as pn from size S',function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({data:[]})
        }
        else {
            res.status(200).json({ data:result })
        }
    });

});
router.post('/edit_size', function (req, res, next) {

    console.log(req.body);
    pool.query('update size set size=? where sizeid=?',[req.body.size,req.body.sizeid],function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({status:false})
        }
        else {
            res.status(200).json({ status:true })
        }
    });

});

router.post('/delete_size', function (req, res, next) {

    console.log(req.body);
    pool.query('delete from size where sizeid=?',[req.body.sizeid],function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({status:false})
        }
        else {
            res.status(200).json({ status:true })
        }
    });

}); 
router.post('/display_size_by_products',function(req,res,next){ 

    pool.query('select size,sizeid from size where productid=?',[req.body.productid],function(error,result){ 
        console.log(result[0]); 
        var size=JSON.parse(result[0].size) 
        console.log(size);

        if(error){
            res.status(500).json({data:[]})
        }
        else{ 
           if(result.length>0){
            res.status(200).json({data:size})
           }
           else{
            res.status(500).json({data:[]})
           }
          
        }

    })
});

router.post('/display_size_of_products_by_subcategory',function(req,res,next){ 
 console.log(req.body);
    pool.query('select size from size where subcategoryid=?',[req.body.subcategoryid],function(error,result){ 
       console.log(result[0])

        if(error){
            res.status(500).json({data:[]})
        }
        else{ 
           if(result.length>0){
            res.status(200).json({data:result[0]})
           }
           else{
            res.status(500).json({data:[]})
           }
          
        }

    })
});

module.exports = router;


