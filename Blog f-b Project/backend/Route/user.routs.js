const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User, validate} = require('../model/user');
const joi = require('joi')

const loginValidate = (data)=>{
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")

    });
    return schema.validate(data);
}

router.post('/register', async (req, res) => {
    
    try
    {
        const {error} = validate(req.body);
        if(error)
        {
            return res.status(400).send({message: error.details[0].message});
        }
        const user = await User.findOne({email: req.body.email});
        if(user)
        {
            return  res.status(409).send({message: "User with given email already exists!"});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully"});
    }
    catch(err)
    {
        res.status(500).send({message: "Internal Server Error"});
    }

});

router.post("/login",async (req,res)=>{
    try{
        const {error} = loginValidate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message});
        }
        const user = await User.findOne({email: req.body.email} );
        if(!user){
            return res.status(401).send({message: "Invalid Email or Password"});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(401).send({message: "Invalid Email or Password"});
        }
        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in successfully"});
    }
    catch(err){
        res.status(500).send({message: "Internal Server Error"});
    }
});



module.exports = router;