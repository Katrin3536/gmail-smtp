const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express()

let smtp_login=process.env.SMTP_LOGIN;
let smtp_password=process.env.SMTP_PASSWORD;

let transporter = nodemailer.createTransport({
    service: 'gmail', //smtp.gmail.com
    secure: false, //true
    port: 25, //465
    auth: {
        user: smtp_login ,
        pass: smtp_password ,
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.post('/', (req, res) => {
    res.send('Hello World!')
})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.post(`/sendMessage`, async (req, res) => {

    let {name, email, subject} = req.body.data

    let info = await transporter.sendMail({
        from: "My Profile Page",
        to: "dudko.katerina86@gmail.com",
        subject: "HR WANTS ME",
        html: `<b>Message from portfolio page</b>
    <div>
    name:${name}
    </div>
    <div>
     email:${email}
     </div>
     <div>
     message:${subject}
     </div>`
    });

    res.send('Hello!')
})

let PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

