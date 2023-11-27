import twilio from "twilio";

class TwilioMessenger {
  constructor() {
    this.client = new twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )
  };

  async sendMessage(message) {
    try {
      const response = await this.client.messages.create(message);
      console.log('Message sent successfully:', response.sid);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  }
};
//lỗi khi run dev "username is required"
export default TwilioMessenger;

// const client = new twilio(
//   'AC661ccc0309c8e836d8f9073d03b71367',
//   '6511172868723a25b6b05ae3bebe84e7'
// );

// client.messages.create(message)
//   .then((response) => {
//     console.log('Message sent successfully:', response.sid);
//   })
//   .catch((error) => {
//     console.error('Error sending message:', error.message);
//   });


// //Nexmo
// import { Vonage } from '@vonage/server-sdk';

// const vonage = new Vonage({
//   apiKey: "e003da89",
//   apiSecret: "TeFy1mq5shdEGHfP"
// })
// const from = "test"
// const to = "+84962628409"
// const text = 'A text message sent using the Vonage SMS API '

// await vonage.sms.send({to, from, text})
// .then(resp => { console.log('Message sent successfully'); console.log(resp); })
// .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });