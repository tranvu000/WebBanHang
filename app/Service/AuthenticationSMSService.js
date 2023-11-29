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

export default TwilioMessenger;