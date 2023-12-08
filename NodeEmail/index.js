"use strict";
const { Console } = require("console");
const { stat } = require("fs");
const nodemailer = require("nodemailer");
const kafka = require("../streams/kafka.js");

// async..await is not allowed in global scope, must use a wrapper
async function main() {

  // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sven7@ethereal.email',
      pass: 'v5Dky1QeaX9tDTeHa8'
    },
    });

    //console.log("Message sent: %s", info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  const handleEvent = (eventMessage) => {
    console.log("Handling message -----------")
    var key = eventMessage.key.toString();
    var data = JSON.parse(eventMessage.value.toString());
    console.log(data);
    switch(key){
      case 'created-offer':
          console.log("Inside the created offer -------------------")
          sendOfferCreatedEmail(data.offeror, data.recipient)
        break;
      case 'updated-offer':
        sendOfferStatusEmail(data.offeror, data.recipient, data.status)
        break;
      case 'updated-user':
        console.log("Inside the password method --------------")
        sendNewUserPasswordEmail(data.name, data.email,data.password);
      break;

    }

    
    
  }
  kafka.startOffersConsumer(handleEvent);
  
  const sendOfferCreatedEmail = async(offeror,recipient) =>{
    let info = await transporter.sendMail({
      from: '"No Reply" <noreply@metrogamesapi.com>', // sender address
      to: `${recipient}@gmail.com, ${offeror}@gmail.com`, // list of receivers
      subject: "Offer Created", // Subject line
      text: `Hello ${offeror} & ${recipient}, this email it to notify you that an offer is live, Currently ${offeror} has made an offer to ${recipient} `, // plain text body
      html: `<b>Hello ${offeror} & ${recipient}, this email it to notify you that an offer is live, Currently ${offeror} has made an offer to ${recipient}</b>`, // html body
      });
  }

  const sendNewUserPasswordEmail = async(username,email,password) =>{
    let info = await transporter.sendMail({
      from: '"No Reply"<noreply@metrogamesapi.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Password Change", // Subject line
      text: `Hello ${username}, your password has been changed please use you new password, ${password} , from now on`, // plain text body
      html: `<b>Hello ${username}, your password has been changed please use you new password, ${password}, from now on<b>`, // html body
      });
  }

  const sendOfferStatusEmail = async(offeror,recipient,status) =>{
    let info = await transporter.sendMail({
      from: '"No Reply"<noreply@metrogamesapi.com>', // sender address
      to: `${offeror}@gmail.com, ${recipient}@gmail.com `, // list of receivers
      subject: `Offer ${status}`, // Subject line
      text: `Hello ${offeror}, your offer has been ${status}, by ${recipient}`, // plain text body
      html: `<b>Hello ${offeror}, your offer has been ${status}, by ${recipient}<b>`, // html body
      });
  }

}

main().catch(console.error);