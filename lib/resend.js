const {Resend} = require("resend")
const dotenv = require("dotenv")
dotenv.config()

console.log(process.env.RESEND_API_KEY)
const resendClient = new Resend(process.env.RESEND_API_KEY) 

const sender={
    email:process.env.EMAIL_FROM,
    name:process.env.EMAIL_FROM_NAME
} 

module.exports={resendClient,sender}