//const mailer =  require("nodemailer");

import {createTransport} from "nodemailer";

const getEmailData = (to, name) =>{
    let data = {
        from:"Admin <lahiruferreira444@gmail.com>",
        to,
        subject:'Hello'+{name},
        html:"<h1>Hello</h1>"
    }
    return data;
}

const sendEmail = (to, name) =>{
    const smtpTransport = createTransport({
        service:"Gmail",
        auth:{
            user:"lahiruferreira444@gmail.com",
            pass:"vernon123"
        }
    })

    const mail = getEmailData(to,name);

    smtpTransport.sendMail(mail,function (err,response) {
        if(err){
            console.log(err);
        }else{
            console.log("Email Sent!");
        }
        smtpTransport.close();
    })
};


module.exports = {sendEmail};