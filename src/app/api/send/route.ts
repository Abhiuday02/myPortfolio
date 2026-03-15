import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess) {
      const validationMessage = zodError.issues
        .map((issue) => issue.message)
        .join(" ");

      return Response.json({ error: validationMessage }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddress = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromAddress,
      to: [config.email],
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }),
    });

    if (resendError) {
      return Response.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return Response.json(resendData);
  } catch {
    return Response.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 }
    );
  }
}
