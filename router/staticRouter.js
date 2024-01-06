const express = require("express");
const URL = require("../model/url");


const router =express.Router();


router.get('/', async (req, res)=>{

    console.log("Req user data: ",req.user)
    if(!req.user) return res.redirect("/login");

    const AllUrl=  await URL.find({createdBy : req.user._id})
    console.log("AllUrl: ", AllUrl)
    return  res.render('home',{
        all : AllUrl
    })
    
})

router.get('/signup' , async(req, res)=>{
    return res.render('signup');
})

router.get('/login' , async(req, res)=>{
    return res.render('login');
})



module.exports = router;