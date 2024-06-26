const mongoose = require("mongoose");
const userModel=require("../models/userModel")
const nodemailer=require("nodemailer")

const signup=(req,res)=>{
    console.log(req.body)
    const newUser=new userModel({
        
        email: req.body.email,
        password:  req.body.password,
    })
    newUser.save().then(()=>{
        res.send({ code: 201, message: "succesfuly signuped" })
    })
    .catch((err)=>{
        res.send({ code: 500, message: "something went wrong" })
    })

}
const Signin=(req,res)=>{
    console.log(req.body)
    userModel.findOne({email: req.body.email}).then(result=>{
        console.log(result,'11')
        if(result.password !== req.body.password){
            res.send({ code: 400, message: "password not matched" })
        }else{
            res.send({ email: result.email,code: 201, message: "User found",token: "wtgfudh" })
        }
       
    }).catch((err)=>{
        res.send({ code: 500, message: "User not found" })
    })

}
const sendotp = async (req, res) => {
    console.log(req.body)
    const _otp = Math.floor(100000 + Math.random() * 900000)
    console.log(_otp)
    let user = await userModel.findOne({ email: req.body.email })
    // send to user mail
    if (!user) {
        res.send({ code: 500, message: 'user not found' })
    }

    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })



    let info = await transporter.sendMail({
        from: 'dnagender2019@gmail.com',
        to: req.body.email, // list of receivers
        subject: "OTP", // Subject line
        text: String(_otp),
        html: `<html>
            < body >
            Hello and welcome
        </ >
       </html > `,
    })

    if (info.messageId) {

        console.log(info, 84)
        userModel.updateOne({ email: req.body.email }, { otp: _otp })
            .then(result => {
                res.send({ code: 200, message: 'otp send' })
            })
            .catch(err => {
                res.send({ code: 500, message: 'Server err' })

            })

    } else {
        res.send({ code: 500, message: 'Server err' })
    }
}


const submitotp = (req, res) => {
    console.log(req.body)


    userModel.findOne({ otp: req.body.otp }).then(result => {

        //  update the password 

        userModel.updateOne({ email: result.email }, { password: req.body.password })
            .then(result => {
                res.send({ code: 200, message: 'Password updated' })
            })
            .catch(err => {
                res.send({ code: 500, message: 'Server err' })

            })


    }).catch(err => {
        res.send({ code: 500, message: 'otp is wrong' })

    })


}

module.exports={signup,Signin,sendotp,submitotp}