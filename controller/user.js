const {v4 :uuidv4 } = require('uuid')
const { connectToMongoDb } = require('../connect');
const User = require('../model/user')
const {setUser, getUser} = require('../service/auth')


async function handleUserSignup(req, res){
    console.log(" post data " ,req.body)
    const {name, email , password } = req.body;
    
    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/")

}

async function  handleUserLogin(req, res){

    console.log("Login Req Body: " ,req.body)
    const {email, password} = req.body;
    const user =  await User.findOne({email, password})
    if(!user) return res.render('login',{
        error :" Invalid Username Or Password"
    })
    
    const sessionID = uuidv4();
    console.log("user in login ", user)
    setUser(sessionID, user);
    res.cookie("Uid", sessionID)

    console.log("reached")

    return res.redirect("/")
}



module.exports ={
    handleUserSignup,
    handleUserLogin
}