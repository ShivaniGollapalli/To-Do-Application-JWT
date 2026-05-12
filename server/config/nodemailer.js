import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_CLIENT_ID:", process.env.GMAIL_CLIENT_ID ? "set" : "MISSING");
console.log("GMAIL_CLIENT_SECRET:", process.env.GMAIL_CLIENT_SECRET ? "set" : "MISSING");
console.log("GMAIL_REFRESH_TOKEN:", process.env.GMAIL_REFRESH_TOKEN ? "set" : "MISSING");
export default transporter;