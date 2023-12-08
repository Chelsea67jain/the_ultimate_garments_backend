var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/submit_products', upload.single('picture'), function (req, res, next) {

    pool.query('insert into products(categoryid,subcategoryid,productname,price,offerprice,stock,description,rating,status,salestatus,picture) values(?,?,?,?,?,?,?,?,?,?,?)', [req.body.categoryid, req.body.subcategoryid, req.body.productname, req.body.price, req.body.offerprice, req.body.stock, req.body.description, req.body.rating, req.body.status, req.body.salestatus, req.file.filename], function (error, result) {

        if (error) {
            console.log(error);
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }

    });

});
router.get('/display_all_products', upload.single('picture'), function (req, res, next) {

    pool.query('select P.*,(select sc.subcategoryname from subcategory sc where sc.subcategoryid=P.subcategoryid) as scn,(select c.categoryname from category c where c.categoryid=P.categoryid) as cn from Products P', function (error, result) {

        if (error) {
            console.log(error);
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }

    });

});
router.post('/edit_products', function (req, res, next) {

    pool.query('update products set categoryid=? , subcategoryid=?, productname=? ,status=?,salestatus=?,description=? where productid=?', [req.body.categoryid, req.body.subcategoryid, req.body.productname, req.body.sale, req.body.salestatus, req.body.description, req.body.productid], function (error, result) {
        //     console.log(error);

        if (error) {
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});
router.post('/delete_products', function (req, res, next) {
    //  console.log('xxxxxxxxxxxxx',req.body)

    pool.query('delete from products where productid=?', [req.body.productid], function (error, result) {

        if (error) {
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});
router.post('/update_picture', upload.single('picture'), function (req, res, next) {

    pool.query('update products set picture=? where productid=?', [req.file.filename, req.body.productid], function (error, result) {
        //  console.log(error);
        if (error) {
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});
router.post('/display_products_by_subcategory', function (req, res, next) {

    //  console.log(req.body);
    pool.query('select * from products where subcategoryid=?', [req.body.subcategoryid], function (error, result) {


        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    });

});



router.post('/fetchAllProducts_by_status', function (req, res, next) {


    pool.query('select * from products where salestatus=?', [req.body.status], function (error, result) {

        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    });

});


router.post('/add_new_banners', upload.any(), function (req, res, next) {

    
    var banners = [];

    req.files.map((item) => {
        banners.push(item.filename)
    })

    // console.log(JSON.stringify(banners));

    pool.query('insert into banners(bannerpicture) values(?)', [JSON.stringify(banners)], function (error, result) {

        if (error) {
            console.log(error);
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});


router.post('/add_product_images', upload.any(), function (req, res, next) {

    console.log(req.files);
    console.log(req.body);
    var banners = [];

    req.files.map((item) => {
        banners.push(item.filename)
    })

    // console.log(JSON.stringify(banners));

    pool.query('insert into productimages(categoryid,subcategoryid,productid,productimages) values(?,?,?,?)', [req.body.categoryid,req.body.subcategoryid,req.body.productid,JSON.stringify(banners)], function (error, result) {

        if (error) {
            console.log(error);
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }
    })
});

router.post('/fetch_all_images_of_products', function (req, res, next) {

    //  console.log(req.body);
    pool.query('select * from productimages where productid=?', [req.body.productid], function (error, result) {
    console.log(result);

        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result})
        }
    });

});


module.exports = router;

