const express = require("express")

const router = express.Router();


router.get('/send',(req,res)=>{
    res.send("Send message end poin")
})



module.exports = router