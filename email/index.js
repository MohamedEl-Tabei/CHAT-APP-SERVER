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
    html: `
    <div style="padding: 50px;">
      <div style="
      font-size:30px;
      border-radius: 60px;
      margin:auto;
      width:max-content;
      padding:30px 60px;
      background-color:#1c264e;
      color:white;">
        ${cod}
      </div>
    </div>
    
    `,
  });
};

module.exports = { code };
