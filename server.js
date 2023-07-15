const express = require('express')
const session = require('express-session')
const {v4:uuidv4} = require('uuid')

const app = express()
const router = require('./router')
const nocache = require('nocache');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use(nocache())

app.set('view engine','ejs')

app.use(express.static('public'));

app.use('/route',router)

app.get('/'/* , nocache() */, (req,res)=>{
    if (req.session.user) {
        res.redirect('/route/home');
        return;
    } else {
        res.render('index',{title : 'log in page'})
    }
})

app.listen(4000)