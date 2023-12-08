var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.get('/display_all_category', function (req, res, next) {
    pool.query('select * from category', function (error, result) {
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    })
});


router.post('/fetch_all_products_by_subcategory', function (req, res, next) {


    pool.query('SELECT P.*,(select C.categoryname from category C where C.categoryid=P.subcategoryid) as scn from products P where P.subcategoryid=?', [req.body.subcategoryid], function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    });

});

router.post('/fetch_size_of_products_by_productid', function (req, res, next) {


    pool.query('select * from colors where productid=?', [req.body.pid], function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            res.status(200).json({ data: result })
        }
    });

});
router.get('/display_all_banners', function (req, res, next) {
    pool.query('select * from banners', function (error, result) {
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {
            console.log(result[0])
            res.status(200).json({ data: result[0] })
        }
    })
});

router.post('/display_all_subcategory', function (req, res, next) {
    console.log(req.body);
    pool.query('select * from subcategory where categoryid=?', [req.body.categoryid], function (error, result) {
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {

            res.status(200).json({ data: result })
        }
    })
});

router.post('/fetch_all_colors_by_sizeid', function (req, res, next) {
    console.log(req.body);
    pool.query('select * from colors where sizeid=?', [req.body.sizeid], function (error, result) {
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {

            res.status(200).json({ data: result })
        }
    })
});

router.post('/submit_userData', function (req, res, next) {
    console.log(req.body);
    pool.query('insert into users(emailid,mobilenumber,firstname,lastname,dateofbirth,gender) values(?,?,?,?,?,?) ', [req.body.emailid, req.body.mobilenumber, req.body.firstname, req.body.lastname, req.body.dob, req.body.gender], function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ status: false })
        }
        else {
            res.status(200).json({ status: true })
        }

    })
});

router.post('/check_user_mobileno', function (req, res, next) {
    console.log(req.body);
    pool.query('select * from users where mobilenumber=?', [req.body.mobilenumber], function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ data: [], status: false })
        }
        else {
            if (result.length == 1) {
                res.status(200).json({ data: result, status: true })
            }
            else {
                res.status(500).json({ data: [], status: false })
            }

        }
    })
});

router.post('/submit_userAddress', function (req, res, next) {
    console.log(req.body);

    pool.query('insert into useraddress(userid,pincode,town,city,state,address) values(?,?,?,?,?,?) ', [req.body.userid, req.body.pincode, req.body.town, req.body.city, req.body.state, req.body.address], function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ status: false })
        }
        else {

            res.status(200).json({ status: true })
        }

    })
});


router.post('/check_user_address', function (req, res, next) {
    console.log(req.body);
    pool.query('select * from useraddress where userid=?', [req.body.userid], function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ data: [], status: false })
        }
        else {
            console.log('hi')
            if (result.length >= 1) {
                res.status(200).json({ data: result, status: true })
            }
            else {
                res.status(500).json({ data: [], status: false })
            }

        }
    });
});

router.post('/submit_order', function (req, res, next) {
    console.log(req.body);
    console.log(req.body.emailid);

    var date = new Date('2023-06-06');
   
    console.log(date);
    pool.query('insert into orders(orderdate,userid,mobilenumber,emailid,productid,quantity) values(?,?,?,?,?,?)', [date,req.body.userid, req.body.mobilenumber, req.body.emailid, req.body.productid, req.body.qty], function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ message: 'Server Error', status: false })
        }
        else {
          
                    res.status(200).json({ message: 'Order Details Added Successfully', status: true })
              }
        
    });
});

router.get('/fetch_all_products_by_LTH', function (req, res, next) {

    pool.query('select P.*,(select SC.subcategoryname from subcategory SC where P.subcategoryid=SC.subcategoryid ) as subcategoryname from products P order by P.price', function (error, result) {
        console.log(result);
        if (error) {
            res.status(500).json({ data: [] })
        }
        else {

            res.status(200).json({ data: result })
        }
    })
});

router.get('/fetch_all_products_by_HTL', function (req, res, next) {

    pool.query('select P.*,(select SC.subcategoryname from subcategory SC where P.subcategoryid=SC.subcategoryid ) as subcategoryname from products P order by P.price desc', function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ data: [] })
        }
        else {

            res.status(200).json({ data: result })
        }
    })
});

router.post('/search_products', function (req, res, next) {
    console.log(req.body.productname);
    var q = "select P.* from products P where P.productname like '%" + req.body.productname + "%'"

    pool.query(q, function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ data: [] })
        }
        else {

            res.status(200).json({ data: result })
        }
    })
});
module.exports = router;  