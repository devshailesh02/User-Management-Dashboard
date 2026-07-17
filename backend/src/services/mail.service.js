import { Resend } from "resend";
// import { ResetPasswordEmailTemplate } from "../emailTemplates/resetPasswordTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = (email, companyName, resetLink) =>
  resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "shaileshpal.dev@gmail.com",
    subject: "Reset Password",
    html: `
      <h2>Hello ${companyName}</h2>

      <p>You requested a password reset.</p>

      <a href="${resetLink}">
        Reset Password
      </a>
    `,
  });
