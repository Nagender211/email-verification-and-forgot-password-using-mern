const express=require("express");
const bodyParser= require("body-parser");
const dotenv=require("dotenv");
const mongoConnection=require("./dbConnection");
const userController=require("./controllers/userControllers");
const cors=require("cors");

dotenv.config();

const port=process.env.PORT || 8080;
const app=express();
app.use(cors({
    
}))
app.use(bodyParser.urlencoded({ extended: false }));



app.use(bodyParser.json());

app.post("/signup", userController.signup);
app.post("/signin", userController.Signin);

app.post("/send-otp", userController.sendotp);
app.post("/submit-otp", userController.submitotp);

app.listen(port,()=>{
    mongoConnection
    console.log("server is running on port 8080");
});
