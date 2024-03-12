const nodemailer = require("nodemailer");
//const resetLink = "http://localhost:3000/resetPassword";
const resetLink="https://chatapp-izc9.onrender.com/resetPassword"
const webLink = "https://chatapp-izc9.onrender.com/";
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
const resetPasswordLink = async (email, token) => {
  const html = token.length
    ? ` 
  <div style="text-align:-webkit-center;">
    <a href="${resetLink}/${token}" style="text-decoration:none;">
      <div style="width:max-content;color:white;background-color:#1c264e;border:4px solid #1c264e ;border-radius:10px;padding:10px;font-weight:bold;">Reset your password</div>
    </a>     
    <h6 style="margin:0px;margin-top:15px;color:#1c264e">You're receiving this email because a password reset was requested for your account.</h6>
  </div>
`
    : `
<div style="text-align:-webkit-center;">
  <a href="${webLink}" style="text-decoration:none;">
    <div style="width:max-content;color:white;background-color:#1c264e;border:4px solid #1c264e ;border-radius:10px;padding:10px;font-weight:bold;">Create new acount</div>
  </a>    
  <h6 style="margin:0px;margin-top:15px;color:red">You don't have a CHATAPP account.</h6>
</div>
`;
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
    subject: "Reset Password",
    html,
  });
};

module.exports = { code, resetPasswordLink };
