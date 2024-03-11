import { NextResponse } from "next/server";
import { Resend } from "resend";

RESEND_API_KEY = "re_Eh9nB2QF_HLMKsTLu2vxLohzu2Hg7AXyo"
FROM_EMAIL = "096ee3f5-155b-4d78-a27a-f3f0e4c6fee4"

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
