import Resend from 'resend';

const resend = new Resend('re_W9XcfsQw_BLk9NmvJw4TPi6UhSzs4jhmW');

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, firstName, lastName, subject, message } = body;

    const response = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: `${firstName} ${lastName}`,
      html: `<h2>${subject}</h2><p>${message}</p>`,
    });

    return { success: true, response };

    
  } catch (err) {
    return { success: false, error: err.message };
  }
});
