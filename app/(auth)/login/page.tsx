import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in — Music Connector",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-foreground">
        Welcome back.
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Post about what you are playing. Pick one song a week. Keep your streak.
      </p>
      <LoginForm />
    </div>
  );
}
