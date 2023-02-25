const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require("jsonwebtoken");
app.use(cors())
app.use(express.json())

require("dotenv").config();
const client = require("twilio")(process.env.ACC_SID, process.env.AUTH_TOKEN);

app.post('/send-sms',async(req,res) => {

    console.log(req.body)
    try {
        await client.messages
        .create({
        body: `${req.body.patName} with Severity "${req.body.Severity}" has been admitted in ${req.body.hospName}`,
        to: `+916382944040`,
        from: process.env.TWILIO_NUM,
        })  
        res.status(200).send('ok')
        console.log('ok')
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post('/create-token', async(req,res) => {
    try {
        const user = req.body
        console.log(user)
        const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
          });
        res.status(200).send({message:'successful',token:token})
    } catch(err) {
        console.log(err)
        res.status(500).send('err')
    } 
})

app.listen(5000, () => console.log('running on 5000'))