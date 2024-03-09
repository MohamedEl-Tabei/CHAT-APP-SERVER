const nodemailer = require("nodemailer");
const resetLink="https://effervescent-seahorse-b16f63.netlify.app/"
const center = (html) => {
  return `
  <div style="display: flex;justify-content: center;color:#1c264e;">
    ${html}
  </div>
  `;
};
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
    <div style="padding:50px; color:#1c264e;">
      ${center(
        `<img src="https://i.ibb.co/PgSzxkT/image-29.png" style="width: 210px; margin:auto;padding:5px;background-color: #1c264e;"/>`
      )}
      ${center(
        `<h2 style="font-weight: normal;margin:10px auto;">Reset your password</h2>`
      )}
      ${center(
        token.length?
        `<div style="border:1px solid #e1e4e8;padding: 30px;width: max-content;margin:auto;border-radius: 15px;">
            <h3 style="margin: auto;width: max-content;">Password reset</h3>
            <p style="margin-bottom:0px;">We heard that you lost your Effect password. Sorry about that!</p>
            <p style="margin-top:5px;">But don’t worry! You can use the following button to reset your password:</p>
            <a style="width: max-content;text-decoration:none;display:flex;margin:auto;" href="${resetLink}resetPassword/user?=${token}">
              <div style="width: max-content; margin: 50px auto;background-color:#1c264e;padding: 10px 20px;color: white;border-radius: 25px; cursor: pointer;">Reset your password</div>
            </a>
            <p>Thanks,</p>
            <p>Mohamed Eltabei</p>
        </div>`:
        `<h1 style="color:red;border:1px solid #e1e4e8;padding: 30px;width: max-content;margin:auto;border-radius: 15px;">You don't have an account </h1>`
      )}
      ${center(
        `<small style="margin: 10px auto;">You're receiving this email because a password reset was requested for your account.</small>`
      )}
    </div>
    `,
  });
};

module.exports = { code, resetPasswordLink };
