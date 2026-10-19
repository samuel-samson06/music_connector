import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password — Music Connector",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-foreground">
        Reset your password.
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Enter the email you signed up with and we will send you a link to set a
        new password.
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
