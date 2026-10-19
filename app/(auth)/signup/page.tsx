import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { SignupPreview } from "@/components/auth/signup-preview";

export const metadata: Metadata = {
  title: "Create account — Music Connector",
};

export default function SignupPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-foreground">
        Share the songs that move you.
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Post about what you are playing. Pick one song a week. Keep your streak.
      </p>
      <div className="mt-6">
        <SignupPreview />
      </div>
      <SignupForm />
    </div>
  );
}
