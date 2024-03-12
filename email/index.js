const nodemailer = require("nodemailer");
//const resetLink = "http://localhost:3000/";
const resetLink="https://chatapp-izc9.onrender.com/"
const logo = "https://i.ibb.co/PgSzxkT/image-29.png";
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
    <img style="width:150px;background-color:#1c264e;padding:5px;" src=${logo}/>
    <h2 style="font-weight:100;margin:0px;margin-bottom:15px;margin-top:15px;color:black">Reset your password</h2>
  </div>
  <div style="text-align:-webkit-center;color:black">
    <div style="border:1px solid #e1e4e8;border-radius:10px !important; width:max-content;padding:24px;">
      <h3 style="margin-bottom:10px;color:black"">Password reset</h3>
      <div style="text-align:-webkit-left;margin-bottom:8px;color:black"">We heard that you lost your CHATAPP password. Sorry about that!</div>
      <div style="text-align:-webkit-left;margin-bottom:35px;color:black"">But don’t worry! You can use the following button to reset your password:</div>
      <a href="${resetLink}resetPassword/${token}" style="text-decoration:none;">
        <div style="width:max-content;color:white;background-color:#1c264e;border:4px solid #1c264e ;border-radius:10px;padding:10px;font-weight:bold;">Reset your password</div>
      </a>             
      <div style="text-align:-webkit-left;margin-top:45px;">Thanks,</div>
      <div style="text-align:-webkit-left;">Mohamed Eltabei</div>
    </div>
  </div>
  <div style="text-align:-webkit-center;color:#6a737d;margin-top:5px;">
    <small>You're receiving this email because a password reset was requested for your account.</small>
  </div>
`
    : `
<div style="text-align:-webkit-center;">
  <img style="width:150px;" src=${logo}/>
  <h2 style="font-weight:100;margin:0px;margin-bottom:15px;margin-top:15px;color:red">You don't have a CHATAPP account.</h2>
</div>
<div style="text-align:-webkit-center;color:#6a737d;margin-top:5px;">
  <small>You're receiving this email because a password reset was requested for your account.</small>
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
    subject: "Verify Email",
    html,
  });
};

module.exports = { code, resetPasswordLink };
