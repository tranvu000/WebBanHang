import { Vonage } from '@vonage/server-sdk';

const vonage = new Vonage({
  apiKey: "e003da89",
  apiSecret: "TeFy1mq5shdEGHfP"
})
const from = "test"
const to = "+84962628409"
const text = 'A text message sent using the Vonage SMS API '

await vonage.sms.send({to, from, text})
.then(resp => { console.log('Message sent successfully'); console.log(resp); })
.catch(err => { console.log('There was an error sending the messages.'); console.error(err); });

export default vonage;