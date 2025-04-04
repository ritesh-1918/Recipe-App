// Imporiting all required exterl modules

const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const app=express()
const PORT=3000
app.use(express.json());

//Connecting to DB Atlas
mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected successfully...")
).catch(
    (err)=>console.log(err)
)

//API landing page http://localhost:3000/
app.get('/',async(req,res)=>{
    try{
        res.send("<h2 style='color:red;text-align:center'>Welcome to the MERN Stack | Week 2 | Backend</h2>")
    }
    catch(err)
    {
        console.log(err)
    }
})

//API Registration Page http://localhost:3000/register
app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new User({username,email,password:hashPassword})
        await newUser.save()
        console.log("New user is created....")
        res.json({message: "User Registred.."})
    }
    catch(err)
    {
        console.log(err)
    }
})

//API login http://localhost:3000/login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });

    }
    catch(err)
    {
        console.log(err)
    }
})

//Server connection and testing
app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port :"+PORT)
})

// Add these after middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Add JWT middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};