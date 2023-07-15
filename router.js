const express = require('express')
const router = express.Router()
const nocache = require('nocache');
let credential = {
    email : 'user444@gmail.com',
    password : 'user444'
}

router.use(nocache())

// POST /route/login
router.post('/login', /* nocache(),  */(req,res)=>{
    if(req.body.email === credential.email && req.body.password === credential.password){
        req.session.user = req.body.email
        res.redirect('/route/home')
    }else{
        res.end('plese login')
    }
})

// GET /route/home
router.get('/home', /* nocache(),  */(req,res)=>{
    if(req.session.user){
        res.render('home',{user : req.session.user})
    }else{
        res.end('unauthorised user')
    }
})


// logout
 router.get('/logout',logger, (req, res, next) => {
     req.session.destroy((err) => {
         if (err) {
             console.error("An error occured", err);
        } else {
            res.redirect('/');

        }
       
     })
 })

 function logger(req,res,next){
    console.log('logged out')
    next()
 }

/* router.get('/logout',(req,res)=>{
    console.log('user logged out')
    res.redirect('/')
})*/

module.exports = router; 