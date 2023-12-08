var express = require('express');
var router = express.Router();
 var pool=require('./pool');
var upload=require('./multer'); 

router.post('/add_color', function (req, res, next) {

    console.log(req.body);

    pool.query('insert into colors(categoryid,subcategoryid,productid,sizeid,color) values(?,?,?,?,?)', [req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.sizeid,req.body.color], function (error, result) {
      
        console.log(error); 

        if (error) {
            res.status(500).json({status:false})
        }
        else {
            res.status(200).json({ status:true })
        }
    });

}); 


router.get('/display_all_colors', function (req, res, next) {
    pool.query('select C.*,(select Ca.categoryname from category ca where Ca.categoryid=C.categoryid) as cn ,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=C.subcategoryid) as scn ,(select P.productname from products P where P.productid=C.productid) as pn from colors C', function (error, result) {
        console.log(result); 
       /* console.log(result[0])
       var color=JSON.parse(result[0].color)*/
 
        
        
        if (error) {
            res.status(500).json({data:[]})
        }
        else {
            res.status(200).json({ data:result })
        }
    });

});

router.post('/edit_colors', function (req, res, next) {

    pool.query('update colors set categoryid=? , subcategoryid=?, productid=? ,size=?,color=? where colorid=?', [req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.size,req.body.color,req.body.colorid], function (error, result) {
        console.log(error);
        
        if (error) {
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});


router.post('/display_color_of_products_by_subcategory', function (req, res, next) {
    
    pool.query('select * from colors where subcategoryid=?', [req.body.subcategoryid],function (error, result) {
      
        console.log(result[0]);
        if (error) {
            res.status(500).json({data:[]})
        }
        else {
            res.status(200).json({ data:result })
        }
    });

});

module.exports = router; 
