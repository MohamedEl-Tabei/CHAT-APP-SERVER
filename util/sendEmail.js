const nodemailer = require("nodemailer");
const code = async (email, cod) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Email",
    html: `<p>${cod}</p>`,
  });
};

module.exports = { code };
