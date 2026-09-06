require("dotenv").config();

const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

async function testEmail() {
  try {
    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_FROM_EMAIL,
              Name: process.env.MAILJET_FROM_NAME || "dbtPapers",
            },

            To: [
              {
                Email: "dasaribhanuteja6@gmail.com",
              },
            ],

            Subject: "dbtPapers Mailjet Test",

            TextPart:
              "This is a test email from dbtPapers using Mailjet.",

            HTMLPart: `
              <h2>dbtPapers Mailjet Test</h2>
              <p>
                This email was successfully sent using Mailjet.
              </p>
            `,
          },
        ],
      });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log(result.body);
  } catch (error) {
    console.error("EMAIL FAILED");

    console.error(
      error?.response?.body ||
      error?.body ||
      error
    );
  }
}

testEmail();