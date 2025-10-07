const { resendClient, sender } = require("../lib/resend")
const { createWelcomeEmailTemplate } = require("./emailTemplate")

const sendWelcomeEmail=async (email,name,clientURL)=>{
    const {data,error}=await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:`<h1>Welcome to Chatify</h1>`,
        html:createWelcomeEmailTemplate(name,clientURL)
    })

    if(error){
        console.log("Error sending welcome emails",error)
        throw new Error ("Failed to send welcome email")
    } 

    console.log("Welcome email send succesfully",data)
}

module.exports={sendWelcomeEmail}