const twilio = require('twilio');
const accountInfo = require('./twilio_account.json');

const accountSid = accountInfo.account_sid;
const authToken = accountInfo.auth_token;

module.exports = new twilio.Twilio(accountSid, authToken);


