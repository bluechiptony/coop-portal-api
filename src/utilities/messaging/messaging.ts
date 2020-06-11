import Mailgun from "mailgun-js";
import logger from "../helpers/logger";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey: string = process.env.MAILGUN_KEY || "";
const domain: string = process.env.MAILGUN_DOMAIN || "";
const mailgun = Mailgun({
  apiKey: apiKey,
  domain: domain,
});

console.log(process.env.MAILGUN_KEY);
console.log(process.env.PORT);

export const sendAccountActivationMessage = (emailAddress: string, activationCode: string, publicAccess: boolean): void => {
  let messageDetails: any = {
    from: "Benue state Health Insurance Agency <donot-reply@bnshia.be.gov.ng>",
    to: emailAddress,
    subject: "Account Activation",
    template: "account_activation",
    "h:X-Mailgun-Variables": JSON.stringify({ activationUrl: `${process.env.APP_PORTAL_DOMAIN}/activate-account/${activationCode}` }),
  };

  mailgun.messages().send(messageDetails, (err, body) => {
    if (err) {
      logger.error(err.message);
    }
  });
};

export const sendPasswordRecoveyMessage = (emailAddress: string, activationCode: string, publicDomain: boolean): void => {
  let messageDetails: any = {
    from: "Benue state Health Insurance Agency <donot-reply@bnshia.be.gov.ng>",
    to: emailAddress,
    subject: "Password Recovery",
    template: "password_recovery",
    "h:X-Mailgun-Variables": JSON.stringify({ activationUrl: `${process.env.APP_PORTAL_DOMAIN}/reset-password/${activationCode}` }),
  };

  mailgun.messages().send(messageDetails, (err, body) => {
    if (err) {
      logger.error(err.message);
    }
  });
};

export const sendBeneficiaryRegistrationMessage = (emailAddress: string, userCode: string, firstName: string): void => {
  let messageDetails: any = {
    from: "Benue state Health Insurance Agency <donot-reply@bnshia.be.gov.ng>",
    to: emailAddress,
    subject: "Insurance Enrollment",
    template: "enrolment_confirmation",
    "h:X-Mailgun-Variables": JSON.stringify({ activationUrl: `${process.env.APP_PORTAL_DOMAIN}/create-account/${userCode}`, firstName: firstName, beneficiaryCode: userCode }),
  };

  //TODO

  mailgun.messages().send(messageDetails, (err, body) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.error(body);
    }
  });
};
