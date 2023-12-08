var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');


router.post('/add_new_subcategory', upload.single('icon'), function (req, res, next) {

    pool.query('insert into subcategory(categoryid,subcategoryname,icon,bannerpriority) values(?,?,?,?)', [req.body.categoryid, req.body.subcategoryname, req.file.filename,req.body.bannerpriority], function (error, result) {
        console.log(error);
        if (error) {
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});


router.post('/edit_subcategory', function (req, res, next) {

    pool.query('update subcategory set subcategoryname=?,bannerpriority=? where subcategoryid=?', [req.body.subcategoryname,req.body.bannerpriority,req.body.subcategoryid], function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});


router.get('/display_subcategory', function (req, res, next) {
    pool.query('SELECT S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as cn from subcategory S', function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    });

});

router.post('/display_subcategory_by_category', function (req, res, next) {

 //   console.log(req.body);
    pool.query('SELECT S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as cn from subcategory S where S.categoryid=?', [req.body.categoryid], function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    });

});





router.post('/delete_subcategory', function (req, res, next) {

    pool.query('delete subcategory where subcategoryid=?', [req.body.subcategoryid], function (error, result) {
        console.log(error);
        if (error) {
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});

router.post('/upload_subcategoryicon', upload.single('icon'), function (req, res, next) {

    pool.query('update subcategory set icon=? where subcategoryid=?', [req.file.filename, req.body.subcategoryid], function (error, result) {
        console.log(error);
        if (error) {
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});

router.post('/display_subcategory_by_priority', function (req, res, next) {
    pool.query('select * from subcategory where bannerpriority=?', [req.body.priority],function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    });

});

router.post('/display_products_by_category_and_subcategory', function (req, res, next) {
    pool.query('select * from products where categoryid=? and subcategoryid=?', [req.body.cid,req.body.scid],function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    });

});

module.exports = router;
