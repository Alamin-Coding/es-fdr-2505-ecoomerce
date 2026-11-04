import React, { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import SocialButtons from "../components/auth/SocialButtons";
import UnderlineInput from "../components/auth/UnderlineInput";
import photo from "../assets/login.png";
// Dummy image - replace with your own
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80";

export default function LoginPage({
  image = photo || DEFAULT_IMAGE,
  onSubmit,
  onGoogle,
  onEmail,
  registerHref = "/signup",
  forgotHref = "/forgot-password",
}) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <AuthLayout image={image} imageAlt="Fashion model" title="Sign In To FASCO">
      <SocialButtons onGoogle={onGoogle} onEmail={onEmail} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <UnderlineInput
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <UnderlineInput
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <div className="space-y-4 pt-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:bg-neutral-800"
          >
            Sign In
          </button>
          <a
            href={registerHref}
            className="block w-full rounded-lg border border-blue-600 py-4 text-center text-sm font-semibold tracking-wide text-blue-600 transition hover:bg-blue-50"
          >
            Register Now
          </a>
          <div className="text-right">
            <a
              href={forgotHref}
              className="text-sm font-semibold tracking-wide text-blue-600 hover:underline"
            >
              Forget Password?
            </a>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}