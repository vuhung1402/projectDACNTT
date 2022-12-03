const express = require('express')

const ejs = require('ejs')

const app = express()
const session = require('express-session')

const bodyParser = require('body-parser')
const mysql = require('mysql');


app.listen(8080); 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({secret:"secret"}))

app.set('view engine','ejs');

function isProductInCart(cart,id){
    for(let i =0; i<cart.length; i++){
        if(cart[i].id == id){
            return true 
        }
    }
    return false
}

function calculateTotal(cart, req){
    total = 0
    for(let i =0; i<cart.length; i++){
        total = total + cart[i].price
    }

    req.session.total = total;
    return total;
}

//localhost:8080
app.get('/', function(req,res){

    var con = mysql.createConnection({
        host:"us-cdbr-east-06.cleardb.net",
        user:"b060c3fa72ae89",
        password:"0e6af735",
        database:"heroku_9921352427430fd"
    })

    con.connect(function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Connect successfully")
        }
    })

    con.query("SELECT * FROM heroku_9921352427430fd.product LIMIT 8",(err,result)=>{

        res.render('pages/index', {result:result});
    })
    

})

app.get('/kit', function(req,res){
    var con = mysql.createConnection({
        host:"us-cdbr-east-06.cleardb.net",
        user:"b060c3fa72ae89",
        password:"0e6af735",
        database:"heroku_9921352427430fd"
    })
    
    con.connect(function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Connect successfully")
        }
    })

    con.query('SELECT * FROM heroku_9921352427430fd.product where category = "Kit" LIMIT 9',function(err,result){
        res.render('pages/shop', {result:result});
    })
})

app.get('/keycap', function(req,res){
    var con = mysql.createConnection({
        host:"us-cdbr-east-06.cleardb.net",
        user:"b060c3fa72ae89",
        password:"0e6af735",
        database:"heroku_9921352427430fd"
    })
    con.connect(function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Connect successfully")
        }
    })

    con.query('SELECT * FROM heroku_9921352427430fd.product where category = "Keycap" LIMIT 9',function(err,result){
        res.render('pages/shop', {result:result});
    })
})

app.get('/switch', function(req,res){
    var con = mysql.createConnection({
        host:"us-cdbr-east-06.cleardb.net",
        user:"b060c3fa72ae89",
        password:"0e6af735",
        database:"heroku_9921352427430fd"
    })
    con.connect(function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Connect successfully")
        }
    })

    con.query('SELECT * FROM heroku_9921352427430fd.product where category = "Switch" LIMIT 9',function(err,result){
        res.render('pages/shop', {result:result});
    })
})

app.get('/stab', function(req,res){
    var con = mysql.createConnection({
        host:"us-cdbr-east-06.cleardb.net",
        user:"b060c3fa72ae89",
        password:"0e6af735",
        database:"heroku_9921352427430fd"
    })
    con.connect(function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Connect successfully")
        }
    })

    con.query('SELECT * FROM heroku_9921352427430fd.product where category = "Stab" LIMIT 9',function(err,result){
        res.render('pages/shop', {result:result});
    })
})
app.get('/shop', function(req,res){
    var con = mysql.createConnection({
        host:"us-cdbr-east-06.cleardb.net",
        user:"b060c3fa72ae89",
        password:"0e6af735",
        database:"heroku_9921352427430fd"
    })
    con.connect(function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Connect successfully")
        }
    })
    
    con.query("SELECT * FROM heroku_9921352427430fd.product LIMIT 9",(err,result)=>{

        res.render('pages/shop', {result:result});
    })

})

// app.get("/login", function(req,res){
//     res.render('pages/login');
// })

// app.get("/register", function(req,res){
//     res.render('pages/register');
// })

// app.post("/login", function(req,res){
//     let email = req.body.email;
//     console.log(email);
// })

app.post('/search', function(req,res){
    
    req.session.nameproduct = req.body.nameproduct
    console.log(req.session.nameproduct)

    res.redirect('/result')
})

app.get('/result',function(req,res){
    var con = mysql.createConnection({
        host:"us-cdbr-east-06.cleardb.net",
        user:"b060c3fa72ae89",
        password:"0e6af735",
        database:"heroku_9921352427430fd"
    })
    con.connect(function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Connect successfully")
        }
    })

    con.query(`SELECT * FROM heroku_9921352427430fd.product where nameproduct LIKE '%${req.session.nameproduct}%'`,(err,result)=>{

        console.log(result)
        res.render('pages/shop', {result:result});
    })
})



app.get('/:idproduct', function(req,res){
    detailProduct(req.params.idproduct,res)
})

function detailProduct(id,res){
    var con = mysql.createConnection({
        host:"us-cdbr-east-06.cleardb.net",
        user:"b060c3fa72ae89",
        password:"0e6af735",
        database:"heroku_9921352427430fd"
    })
    con.connect(function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Connect successfully")
        }
    })  
    con.query(`SELECT * FROM heroku_9921352427430fd.product where idproduct = ${id}`,function(err,result){
        console.log(result)
        res.render('pages/detail', {result:result});
    })
}



